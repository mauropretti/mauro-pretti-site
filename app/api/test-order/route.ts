import {NextResponse} from 'next/server'
import {writeClient} from '@/sanity/writeClient'

export async function GET() {

  await writeClient.create({

    _type: 'order',

    paymentId: 'TEST',

    status: 'TEST',

    customerName: 'Mauro',

    customerEmail: 'mauro@test.com',

    customerPhone: '123',

    artwork: 'Test Artwork',

    size: '30x45',

    price: 1000,

    createdAt: new Date().toISOString(),

  })

  return NextResponse.json({
    success: true,
  })

}