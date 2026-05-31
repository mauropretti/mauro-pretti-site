import {NextResponse} from 'next/server'

import {writeClient} from '@/sanity/writeClient'

export async function POST(req: Request) {

  try {

    const body = await req.json()

    await writeClient.create({

      _type: 'order',

      paymentId:
        String(body?.data?.id || ''),

      status:
        String(body?.action || ''),

      customerName:
        'Webhook Test',

      customerEmail:
        'test@test.com',

      customerPhone:
        '',

      artwork:
        'Webhook Test',

      size:
        'Webhook Test',

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
      {
        success: false,
      },
      {
        status: 500,
      }
    )

  }

}

