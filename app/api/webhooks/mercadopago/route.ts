// app/api/mercadopago/webhook/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// MercadoPago Webhook Handler — versión segura y lista para producción
//
// Variables de entorno requeridas:
//   MERCADOPAGO_ACCESS_TOKEN              → token de acceso de MP
//   MERCADOPAGO_WEBHOOK_SECRET            → secret del webhook (panel MP)
//   MERCADOPAGO_WEBHOOK_SIGNATURE_ENFORCE → "true" para bloquear firmas inválidas
//
// Deploy recomendado (3 fases):
//   Fase 1: sin MERCADOPAGO_WEBHOOK_SECRET        → loguea y deja pasar
//   Fase 2: con secret, sin ENFORCE=true          → audit mode (loguea, no bloquea)
//   Fase 3: con secret + ENFORCE=true             → bloqueo real activo
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createHmac } from 'crypto'
import { writeClient } from '@/sanity/writeClient'
import { sendOrderEmails } from '@/app/lib/sendOrderEmails'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface OrderMetadata {
  customer_name: string
  customer_email: string
  customer_phone: string
  artwork: string
  size: string
  /**
   * Precio del producto en pesos ARS.
   * Debe coincidir con `unit_price` de la preferencia de pago y con
   * `transaction_amount` que devuelve MercadoPago (mismo valor, misma unidad).
   */
  price: number
  /**
   * Monto esperado en pesos ARS — igual al price.
   * Se usa para verificar anti-fraude contra transaction_amount real de MP.
   * Asegurate de pasar el mismo número que usaste en unit_price al crear la preferencia.
   */
  expected_amount: number
}

interface WebhookBody {
  type: string
  data?: { id?: string | number }
}

// ─── Cliente MP (singleton por módulo) ───────────────────────────────────────

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

// ─── Verificación de firma HMAC ───────────────────────────────────────────────
//
// MercadoPago firma cada webhook con el header x-signature en el formato:
//   ts=<timestamp>,v1=<hash_sha256>
//
// El manifest que firma es: id=<data.id>&request-id=<x-request-id>&ts=<ts>
//
// Docs oficiales: https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks

function verifyWebhookSignature(
  req: NextRequest,
  rawBody: string
): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  const enforceSignature = process.env.MERCADOPAGO_WEBHOOK_SIGNATURE_ENFORCE === 'true'

  // ── Fase 1: sin secret configurado ──────────────────────────────────────────
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[MP Webhook] MERCADOPAGO_WEBHOOK_SECRET no configurado. ' +
        'Configuralo en las variables de entorno para activar verificación de firma.'
      )
    }
    // En dev/staging dejamos pasar; en producción sin secret también pasa
    // pero queda el warning en logs para que lo notes.
    return true
  }

  const xSignature = req.headers.get('x-signature')
  const xRequestId = req.headers.get('x-request-id')

  if (!xSignature || !xRequestId) {
    console.warn('[MP Webhook] Headers x-signature o x-request-id ausentes')
    // En fase audit dejamos pasar con warning
    if (!enforceSignature) return true
    return false
  }

  // Parsear ts y v1 del header x-signature
  const parts = Object.fromEntries(
    xSignature
      .split(',')
      .map((part) => part.split('=') as [string, string])
  )

  const ts = parts['ts']
  const receivedHash = parts['v1']

  if (!ts || !receivedHash) {
    console.warn('[MP Webhook] Formato de x-signature inválido', { xSignature })
    if (!enforceSignature) return true
    return false
  }

  // Extraer data.id del body para armar el manifest
  let dataId = ''
  try {
    const parsed: WebhookBody = JSON.parse(rawBody)
    dataId = String(parsed?.data?.id ?? '')
  } catch {
    console.warn('[MP Webhook] No se pudo parsear rawBody para extraer data.id')
    if (!enforceSignature) return true
    return false
  }

  // Manifest que firma MercadoPago
  const manifest = `id=${dataId}&request-id=${xRequestId}&ts=${ts}`
  const expectedHash = createHmac('sha256', secret).update(manifest).digest('hex')
  const isValid = expectedHash === receivedHash

  // ── Fase 2: audit mode (secret configurado, ENFORCE no activo) ───────────────
  if (!enforceSignature) {
    if (!isValid) {
      console.error(
        '[MP Webhook] ⚠️  Firma INVÁLIDA detectada (modo audit — no bloqueado). ' +
        'Verificá que MERCADOPAGO_WEBHOOK_SECRET sea correcto antes de activar ENFORCE.',
        { manifest, receivedHash, expectedHash }
      )
    } else {
      console.log('[MP Webhook] ✅ Firma válida (modo audit)')
    }
    return true // deja pasar igual en audit mode
  }

  // ── Fase 3: modo estricto ────────────────────────────────────────────────────
  if (!isValid) {
    console.error('[MP Webhook] 🚫 Firma inválida — request bloqueado', {
      manifest,
      receivedHash,
      expectedHash,
    })
  }

  return isValid
}

// ─── Validación de metadata ───────────────────────────────────────────────────

function parseMetadata(raw: unknown): OrderMetadata | null {
  if (!raw || typeof raw !== 'object') return null
  const m = raw as Record<string, unknown>

  const email =
    typeof m.customer_email === 'string' ? m.customer_email.trim() : null
  const name =
    typeof m.customer_name === 'string' ? m.customer_name.trim() : null
  const artwork =
    typeof m.artwork === 'string' ? m.artwork.trim() : null
  const size =
    typeof m.size === 'string' ? m.size.trim() : null
  const price = Number(m.price)
  const expectedAmount = Number(m.expected_amount)

  // Validar que los campos requeridos existen y los números son válidos
  if (
    !email ||
    !name ||
    !artwork ||
    !size ||
    isNaN(price) ||
    price <= 0 ||
    isNaN(expectedAmount) ||
    expectedAmount <= 0
  ) {
    return null
  }

  // Validación básica de formato de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null
  }

  return {
    customer_name: name,
    customer_email: email,
    customer_phone:
      typeof m.customer_phone === 'string' ? m.customer_phone.trim() : '',
    artwork,
    size,
    price,
    expected_amount: expectedAmount,
  }
}

// ─── GET — health check mínimo ────────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({ ok: true })
}

// ─── POST — handler principal del webhook ─────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Leer body como texto RAW — necesario para verificar firma ANTES de parsear
  const rawBody = await req.text()

  // 2. Verificar firma criptográfica del webhook
  //    Devolvemos 200 siempre para no dar info al atacante y evitar reintentos innecesarios de MP
  if (!verifyWebhookSignature(req, rawBody)) {
    return NextResponse.json({ ignored: true }, { status: 200 })
  }

  // 3. Parsear body
  let body: WebhookBody
  try {
    body = JSON.parse(rawBody)
  } catch {
    console.warn('[MP Webhook] Body no es JSON válido')
    return NextResponse.json({ ignored: true }, { status: 200 })
  }

  // 4. Solo procesar eventos de tipo "payment"
  if (body.type !== 'payment') {
    return NextResponse.json({ ignored: true })
  }

  const paymentId = body?.data?.id
  if (!paymentId) {
    return NextResponse.json({ ignored: true })
  }

  const paymentIdStr = String(paymentId)

  try {
    // 5. Consultar el pago DIRECTAMENTE a MercadoPago
    //    Nunca confiar en los datos del body — siempre verificar contra la API de MP
    const paymentClient = new Payment(mpClient)
    const payment = await paymentClient.get({ id: Number(paymentId) })

    // 6. Solo procesar pagos aprobados
    if (payment.status !== 'approved') {
      return NextResponse.json({
        ignored: true,
        status: payment.status,
      })
    }

    // 7. Validar y tipar la metadata estrictamente
    const metadata = parseMetadata(payment.metadata)
    if (!metadata) {
      console.error('[MP Webhook] Metadata inválida o incompleta', {
        paymentId: paymentIdStr,
      })
      return NextResponse.json({ ignored: true, reason: 'invalid_metadata' })
    }

    // 8. Verificar que el monto cobrado coincide con el esperado (anti-fraude)
    //    transaction_amount está en pesos ARS, igual que expected_amount
    const paidAmount = payment.transaction_amount ?? 0
    const tolerance = 0.01 // tolerancia por floating point

    if (Math.abs(paidAmount - metadata.expected_amount) > tolerance) {
      console.error('[MP Webhook] 🚫 Monto no coincide — posible fraude de precio', {
        paymentId: paymentIdStr,
        paidAmount,
        expectedAmount: metadata.expected_amount,
      })
      return NextResponse.json({ ignored: true, reason: 'amount_mismatch' })
    }

    // 9. Idempotencia: verificar si la orden ya fue procesada
    //    Fetch reducido a { _id } para eficiencia
    const existingOrder = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "order" && paymentId == $paymentId][0]{ _id }`,
      { paymentId: paymentIdStr }
    )

    if (existingOrder) {
      return NextResponse.json({ alreadyProcessed: true })
    }

    // 10. Crear la orden en Sanity
    //     Nota: asegurate de tener `paidAmount` como campo en tu schema de Sanity.
    //     Si no lo tenés aún, comentá esa línea hasta agregarlo.
    //     Schema sugerido: { name: 'paidAmount', title: 'Monto cobrado', type: 'number' }
    await writeClient.create({
      _type: 'order',
      paymentId: paymentIdStr,
      status: String(payment.status),
      customerName: metadata.customer_name,
      customerEmail: metadata.customer_email,
      customerPhone: metadata.customer_phone,
      artwork: metadata.artwork,
      size: metadata.size,
      price: metadata.price,
      paidAmount: paidAmount, // monto real cobrado — útil para auditoría y reclamos
      createdAt: new Date().toISOString(),
    })

    // 11. Enviar emails de confirmación
    await sendOrderEmails({
      customerName: metadata.customer_name,
      customerEmail: metadata.customer_email,
      customerPhone: metadata.customer_phone,
      artwork: metadata.artwork,
      size: metadata.size,
      price: metadata.price,
      paymentId: paymentIdStr,
    })

    console.log('[MP Webhook] ✅ Orden procesada correctamente', {
      paymentId: paymentIdStr,
      customer: metadata.customer_email,
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    // Log sin exponer detalles internos al cliente
    console.error(
      '[MP Webhook] Error interno:',
      error instanceof Error ? error.message : 'unknown error'
    )

    // 500 solo para errores reales de infraestructura
    // MercadoPago reintentará automáticamente ante 5xx
    return NextResponse.json({ success: false }, { status: 500 })
  }
}