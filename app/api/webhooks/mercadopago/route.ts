import { sendOrderEmails } from '@/app/lib/sendOrderEmails'
import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/writeClient'

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

  try {

    const body = await req.json()

    if (body.type !== 'payment') {

      return NextResponse.json({
        ignored: true,
      })

    }

    const paymentId =
      body?.data?.id

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

    if (
      payment.status !==
      'approved'
    ) {

      return NextResponse.json({
        ignored: true,
        status: payment.status,
      })

    }

    const metadata =
      payment.metadata as any

    if (
      !metadata?.customer_email
    ) {

      return NextResponse.json({
        ignored: true,
        reason:
          'missing customer email',
      })

    }

    const existingOrder =
      await writeClient.fetch(
        `*[_type == "order" && paymentId == $paymentId][0]`,
        {
          paymentId:
            String(paymentId),
        }
      )

    if (existingOrder) {

      return NextResponse.json({
        alreadyProcessed: true,
      })

    }

    await writeClient.create({

      _type: 'order',

      paymentId:
        String(paymentId),

      status:
        String(payment.status),

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

  } catch (error) {

    console.error(
      'MERCADO PAGO WEBHOOK ERROR:',
      error
    )

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