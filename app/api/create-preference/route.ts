import {NextResponse} from 'next/server'

import {
  MercadoPagoConfig,
  Preference,
} from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(req: Request) {

  try {

    const body = await req.json()

    const preference = new Preference(client)

  const result = await preference.create({
  body: {
    items: [
      {
        title: body.title,
        quantity: 1,
        unit_price: Number(body.price),
        currency_id: 'ARS' as any,
      },
    ],
  },
} as any)

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {error: 'Error creating preference'},
      {status: 500}
    )

  }

}