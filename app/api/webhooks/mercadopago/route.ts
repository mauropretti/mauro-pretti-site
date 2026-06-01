import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

export async function GET() {

  return NextResponse.json({
    webhook: true,
  })

}

export async function POST(req: Request) {

  const body = await req.json()

  await writeClient.create({

    _type: 'order',

    paymentId: JSON.stringify(body),

    status: 'RAW WEBHOOK',

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
  })

}

