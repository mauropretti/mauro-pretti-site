import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

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

  return NextResponse.json({
    success: true,
  })}
