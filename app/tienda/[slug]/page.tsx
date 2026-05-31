import Header from '../../components/Header'
 import ProductPurchase from '../../components/ProductPurchase'
import BuyButton from '../../components/BuyButton'
import {notFound} from 'next/navigation'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProduct(slug: string) {

  return client.fetch(

    `
      *[_type == "product" && slug.current == $slug][0]{

        title,
        slug,
        series,
        description,
        coverImage,

        price20x30,
        price30x45,
        price50x70

      }
    `,

    {slug}
  )

}

export default async function ProductPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {

  const {slug} = await params

  const product = await getProduct(slug)

  if (!product) {
    return notFound()
  }

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">

      <Header />

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

        <div className="max-w-[1200px]">

          {product.coverImage && (

            <img
              src={urlFor(product.coverImage)
                .width(2000)
                .quality(90)
                .url()}
              alt={`${product.title} – impresión Fine Art de Mauro Pretti`}
              className="
                w-full
                h-auto

                max-w-[900px]

                object-contain

                mb-12
              "
            />

          )}

          <h1
            className="
              text-[34px]
              md:text-[60px]

              leading-[0.9]

              tracking-[-0.06em]

              font-light

              text-[#4940d8]

              mb-4
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            {product.title}
          </h1>

          {product.series && (

            <p
              className="
                text-[15px]

                text-black/50

                mb-10
              "
              style={{
                fontFamily:
                  'Inter, Helvetica, Arial, sans-serif',
              }}
            >
              {product.series}
            </p>

          )}

          {product.description && (

            <div
              className="
                text-[16px]
                md:text-[18px]

                leading-[1.8]

                text-black/60

                max-w-[760px]

                mb-12
              "
              style={{
                fontFamily:
                  'Inter, Helvetica, Arial, sans-serif',
              }}
            >
              <p>{product.description}</p>
            </div>

          )}


<div
  className="
    mt-12

    space-y-4

    text-[16px]
  "
  style={{
    fontFamily:
      'Inter, Helvetica, Arial, sans-serif',
  }}
>

  <p className="text-black/50 uppercase tracking-[0.08em] text-[13px]">
    Tamaños disponibles
  </p>

  {product.price20x30 && (
    <p>20 × 30 cm — ${product.price20x30}</p>
  )}

  {product.price30x45 && (
    <p>30 × 45 cm — ${product.price30x45}</p>
  )}

  {product.price50x70 && (
    <p>50 × 70 cm — ${product.price50x70}</p>
  )}

  <div className="pt-6">


<BuyButton
  title={product.title}
  price20x30={product.price20x30}
  price30x45={product.price30x45}
  price50x70={product.price50x70}
/>


  </div>

</div>


        </div>

      </section>

    </main>

  )

}