import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

export async function POST(req: Request) {

  try {

    const body = await req.json()

    await writeClient.create({

      _type: 'order',

      paymentId:
        JSON.stringify(body),

      status:
        'WEBHOOK RECEIVED',

      customerName:
        'Webhook',

      customerEmail:
        'webhook@test.com',

      customerPhone:
        '',

      artwork:
        'Webhook',

      size:
        'Webhook',

      price:
        0,

      createdAt:
        new Date().toISOString(),

    })

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {success: false},
      {status: 500}
    )

  }

}
