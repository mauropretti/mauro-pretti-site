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

const metadata = payment.metadata as any

const existingOrder = await writeClient.fetch(
  `*[_type == "order" && paymentId == $paymentId][0]`,
  { paymentId: String(paymentId) }
)

if (existingOrder) {
  return NextResponse.json({
    alreadyProcessed: true,
  })
} 

await writeClient.create({
  _type: 'order',

  paymentId: String(paymentId),

  status: payment.status,

  customerName:
    metadata.customer_name,

  customerEmail:
    metadata.customer_email,

  customerPhone:
    metadata.customer_phone,

  artwork:
    metadata.artwork,

  size:
    metadata.size,

  price:
    Number(metadata.price),

  createdAt:
    new Date().toISOString(),
})

await sendOrderEmails({
  customerName:
    metadata.customer_name,

  customerEmail:
    metadata.customer_email,

  customerPhone:
    metadata.customer_phone,

  artwork:
    metadata.artwork,

  size:
    metadata.size,

  price:
    Number(metadata.price),

  paymentId:
    String(paymentId),
})

  return NextResponse.json({
    success: true,
  })

}