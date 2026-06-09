import type {Metadata} from 'next'
import Script from 'next/script'

export const dynamic = 'force-dynamic'

import Header from '../../components/Header'
import AppLink from '../../components/AppLink'
import GsapReveal from '../../components/GsapReveal'

import {notFound} from 'next/navigation'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProject(slug: string) {
  return client.fetch(
    `
      *[_type == "project" && slug.current == $slug][0]{
        title,
        description,
        coverImage,
        gallery,
        category,
        year
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
  const project = await getProject(slug)

  if (!project) return {}

  const ogImage = project.coverImage
    ? urlFor(project.coverImage).width(1200).height(630).quality(85).url()
    : '/og-image.webp'

  const title = project.title
  const description = project.description
    ? project.description
    : `${project.title} — proyecto fotográfico de Mauro Pretti.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://mauropretti.com/projects/${slug}`,
    },
    openGraph: {
      title: `${title} | Mauro Pretti`,
      description,
      url: `https://mauropretti.com/projects/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} – proyecto fotográfico de Mauro Pretti`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Mauro Pretti`,
      description,
      images: [ogImage],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const project = await getProject(slug)

  if (!project) {
    return notFound()
  }

  return (
    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">
      <Header />

      {/* CONTENT */}
      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">
        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}
          <GsapReveal y={40} duration={1.4}>
            <div className="mb-20">
              <h1
                className="
                  text-[34px]
                  sm:text-[44px]
                  md:text-[62px]
                  leading-[0.9]
                  tracking-[-0.06em]
                  font-light
                  text-[#4940d8]
                  max-w-[900px]
                "
                style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
              >
                {project.title}
              </h1>
            </div>
          </GsapReveal>

          {/* GALLERY */}
          <div className="flex flex-col gap-10">
            {project.gallery?.map((image: any, index: number) => (
              <GsapReveal key={index} y={90} duration={1.8}>
                <div className="flex justify-center">
                  <img
                    src={urlFor(image).width(1600).quality(82).url()}
                    alt={`${project.title} – fotografía ${index + 1} de Mauro Pretti`}
                    className="
                      w-auto
                      h-auto
                      max-w-full
                      max-h-[90vh]
                      object-contain
                    "
                  />
                </div>
              </GsapReveal>
            ))}
          </div>

        </div>
      </section>

      <Script id="scroll-top">{`window.scrollTo(0, 0);`}</Script>

      <footer className="px-6 md:px-10 pb-16">
        <div
          className="
            flex
            flex-wrap
            gap-x-4
            sm:gap-x-5
            gap-y-3
            text-[13px]
            sm:text-[14px]
            tracking-[-0.03em]
            text-black/55
          "
          style={{fontFamily: 'Satoshi, Inter, sans-serif'}}
        >
          <AppLink href="/">Home</AppLink>
          <AppLink href="/lightroom">Lightroom</AppLink>
          <AppLink href="/publicitaria">Publicitaria</AppLink>
          <AppLink href="/teatro">Teatro</AppLink>
          <AppLink href="/el-gesto-intimo" className="tracking-[-0.06em]">
            El gesto íntimo
          </AppLink>
          <AppLink href="/tienda">Tienda</AppLink>
        </div>
      </footer>
    </main>
  )
}