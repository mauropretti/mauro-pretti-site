import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

export async function POST(req: Request) {

  const text = await req.text()

  await writeClient.create({
    _type: 'order',

    paymentId: 'WEBHOOK',

    status: 'WEBHOOK RECEIVED',

    customerName: text.slice(0, 100),

    customerEmail: 'webhook@test.com',

    customerPhone: '',

    artwork: 'Webhook',

    size: 'Webhook',

    price: 0,

    createdAt: new Date().toISOString(),
  })

  return NextResponse.json({
    success: true,
  })

}