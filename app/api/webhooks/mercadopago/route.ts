import {sendOrderEmails} from '@/app/lib/sendOrderEmails'
import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

import {
  MercadoPagoConfig,
  Payment,
} from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken:
    process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function GET() {

  return NextResponse.json({
    webhook: true,
  })

}

export async function POST(req: Request) {

  const body = await req.json()

  if (body.type !== 'payment') {

    return NextResponse.json({
      ignored: true,
    })

  }

  const paymentId = body?.data?.id

  if (!paymentId) {

    return NextResponse.json({
      ignored: true,
    })

  }

  const paymentClient =
    new Payment(client)

  const payment =
    await paymentClient.get({
      id: Number(paymentId),
    })

  console.log(
    JSON.stringify(payment, null, 2)
  )

  await writeClient.create({
    _type: 'order',

    paymentId: String(paymentId),

    status: body.action,

    customerName: 'Webhook',

    customerEmail: 'webhook@test.com',

    customerPhone: '',

    artwork: 'Webhook',

    size: 'Webhook',

    price: 0,

    createdAt: new Date().toISOString(),
  })

  await sendOrderEmails({
    customerName: 'Webhook',
    customerEmail: 'webhook@test.com',
    customerPhone: '',
    artwork: 'Prueba',
    size: '30x45',
    price: 1000,
    paymentId: String(paymentId),
  })

  return NextResponse.json({
    success: true,
  })

}