import Header from '../components/Header'
import Link from 'next/link'
import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProducts() {

  return client.fetch(`
    *[_type == "product"] | order(_createdAt desc) {

      _id,
      title,
      slug,
      series,
      coverImage,

      price20x30,
      price30x45,
      price50x70

    }
  `)

}

export default async function ShopPage() {

  const products = await getProducts()

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">

      <Header />

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

        <div className="max-w-[1200px]">

          <p
            className="
              text-[12px]
              md:text-[13px]

              lowercase

              tracking-[-0.01em]

              text-[#4940d8]/70

              mb-6
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            tienda
          </p>

          <h1
            className="
              text-[28px]
              sm:text-[34px]
              md:text-[48px]
              lg:text-[58px]

              leading-[0.92]

              tracking-[-0.06em]

              font-light

              text-[#4940d8]

              mb-10
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            Impresiones Fine Art
          </h1>

          <p
            className="
              text-[16px]
              md:text-[18px]

              leading-[1.8]

              text-black/55

              max-w-[760px]

              mb-20
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            Selección de obras disponibles como impresión Fine Art sobre papel Hahnemühle.
          </p>

          <div
            className="
              grid
            grid-cols-1
md:grid-cols-2
gap-x-20
gap-y-24
              gap-10
            "
          >

{products.map((product: any) => (

  <div key={product._id}>

    <Link
      href={`/tienda/${product.slug.current}`}
      className="
        block
        group
      "
    >

      {product.coverImage && (

        <img
          src={urlFor(product.coverImage)
            .width(1400)
            .quality(85)
            .url()}
          alt={`${product.title} – impresión Fine Art de Mauro Pretti`}
          className="
            w-full
            h-auto

            object-cover

            mb-5

            transition
            duration-700

            group-hover:opacity-95
          "
        />

      )}

      <h2
        className="
          text-[26px]

          tracking-[-0.04em]

          text-black

          mb-2
        "
        style={{
          fontFamily:
            'Inter, Helvetica, Arial, sans-serif',
        }}
      >
        {product.title}
      </h2>

      {product.series && (

        <p
          className="
            text-[14px]

            text-black/50

            mb-5
          "
          style={{
            fontFamily:
              'Inter, Helvetica, Arial, sans-serif',
          }}
        >
          {product.series}
        </p>

      )}

      <div
        className="
          text-[14px]

          text-black/70

          space-y-1
        "
        style={{
          fontFamily:
            'Inter, Helvetica, Arial, sans-serif',
        }}
      >

        {product.price20x30 && (
          <p>20 × 30 cm — ${product.price20x30}</p>
        )}

        {product.price30x45 && (
          <p>30 × 45 cm — ${product.price30x45}</p>
        )}

        {product.price50x70 && (
          <p>50 × 70 cm — ${product.price50x70}</p>
        )}

      </div>

      <div
        className="
          mt-6

          text-[13px]

          text-[#4940d8]
        "
      >
        Ver obra →
      </div>

    </Link>

  </div>

))}          </div>

        </div>

      </section>

    </main>

  )

}
