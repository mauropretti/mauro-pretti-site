// app/api/mercadopago/create-preference/route.ts
import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validación mínima antes de llamar a MP
    if (!body.name || !body.email || !body.title || !body.size || !body.price) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const unitPrice = Number(body.price)

    if (isNaN(unitPrice) || unitPrice <= 0) {
      return NextResponse.json(
        { error: 'Precio inválido' },
        { status: 400 }
      )
    }

    const preference = new Preference(client)

    const result = await preference.create({
      body: {
        items: [
          {
            title: String(body.title).trim(),
            quantity: 1,
            unit_price: unitPrice,   // pesos ARS
            currency_id: 'ARS',
          },
        ],
        metadata: {
          customer_name: String(body.name).trim(),
          customer_email: String(body.email).trim(),
          customer_phone: body.phone ?? '',
          artwork: body.title,
          size: body.size,
          price: unitPrice,
          expected_amount: unitPrice, // ← mismo valor que unit_price — lo verifica el webhook
        },
        back_urls: {
          success: 'https://mauropretti.com/success',
          failure: 'https://mauropretti.com/failure',
          pending: 'https://mauropretti.com/pending',
        },
        auto_return: 'approved',
        notification_url: 'https://mauropretti.com/api/webhooks/mercadopago',
      },
    }as any)

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    })

  } catch (error) {
    console.error('[MP Create Preference] Error:', error instanceof Error ? error.message : error)

    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago' },
      { status: 500 }
    )
  }
}