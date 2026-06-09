import type {Metadata} from 'next'

import Header from '../../components/Header'
import ProductGallery from '../../components/ProductGallery'
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
        galleryImages,
        price20x30,
        price30x45,
        price50x70
      }
    `,
    {slug}
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const product = await getProduct(slug)

  if (!product) return {}

  const ogImage = product.coverImage
    ? urlFor(product.coverImage).width(1200).height(630).quality(85).url()
    : '/og-image.webp'

  const description = product.description
    ? `${product.description} Impresión Fine Art sobre papel Hahnemühle. Envíos a todo el país.`
    : `${product.title} — fotografía Fine Art de Mauro Pretti. Impresión sobre papel Hahnemühle Matt Fibre. Envíos a todo el país.`

  return {
    title: `${product.title} — Fine Art`,
    description,
    alternates: {
      canonical: `https://mauropretti.com/tienda/${slug}`,
    },
    openGraph: {
      title: `${product.title} | Tienda Mauro Pretti`,
      description,
      url: `https://mauropretti.com/tienda/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${product.title} – impresión Fine Art de Mauro Pretti`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | Tienda Mauro Pretti`,
      description,
      images: [ogImage],
    },
  }
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

  const galleryUrls = [
    product.coverImage
      ? urlFor(product.coverImage).width(1800).quality(90).url()
      : null,
    ...(product.galleryImages ?? []).map((img: any) =>
      urlFor(img).width(1800).quality(90).url()
    ),
  ].filter(Boolean) as string[]

  const thumbUrls = [
    product.coverImage
      ? urlFor(product.coverImage).width(160).height(160).quality(80).url()
      : null,
    ...(product.galleryImages ?? []).map((img: any) =>
      urlFor(img).width(160).height(160).quality(80).url()
    ),
  ].filter(Boolean) as string[]

  return (
    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">
      <Header />

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">
        <div className="max-w-[1200px]">

          <ProductGallery
            coverImage={galleryUrls[0] ?? null}
            galleryImages={galleryUrls.slice(1)}
            thumbUrls={thumbUrls}
            title={product.title}
          />

          <h1
            className="
              text-[34px] md:text-[60px]
              leading-[0.9]
              tracking-[-0.06em]
              font-light
              text-[#4940d8]
              mb-4
            "
            style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
          >
            {product.title}
          </h1>

          {product.series && (
            <p
              className="text-[15px] text-black/50 mb-10"
              style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
            >
              {product.series}
            </p>
          )}

          {product.description && (
            <div
              className="
                text-[16px] md:text-[18px]
                leading-[1.8]
                text-black/60
                max-w-[760px]
                mb-12
              "
              style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
            >
              <p>{product.description}</p>
            </div>
          )}

          <div
            className="mt-12 space-y-4 text-[16px]"
            style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
          >
            <p className="text-black/50 uppercase tracking-[0.08em] text-[13px]">
              Tamaños disponibles
            </p>

            {product.price20x30 && <p>20 × 30 cm — ${product.price20x30}</p>}
            {product.price30x45 && <p>30 × 45 cm — ${product.price30x45}</p>}
            {product.price50x70 && <p>50 × 70 cm — ${product.price50x70}</p>}

            <p
              className="
                pt-4
                text-[13px] md:text-[14px]
                leading-[1.8]
                text-black/45
                max-w-[620px]
              "
              style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
            >
              <strong>Producción Fine Art.</strong> Cada obra se produce
              individualmente a partir del archivo original. Los valores
              corresponden únicamente a la impresión.
              <br /><br />
              <strong>Plazo estimado:</strong> 7 a 10 días.
              <br /><br />
              <strong>Envíos a toda Argentina.</strong> El costo se calcula
              según destino.{' '}
              <em>
                En Ciudad de Buenos Aires también es posible coordinar retiro
                o entrega personal para reducir costos.
              </em>
            </p>

            <p
              className="
                mb-2
                text-[14px] md:text-[15px]
                tracking-[-0.03em]
                text-[#4940d8]
              "
            >
              Iniciar compra de <strong>{product.title}</strong>
            </p>

            <p
              className="
                mb-6
                text-[12px] md:text-[13px]
                leading-[1.7]
                text-black/45
                max-w-[620px]
              "
            >
              Serás dirigido a una plataforma de pago segura. Una vez
              acreditado el pago recibirás un correo de confirmación con
              los detalles de tu compra.
            </p>

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