import Script from 'next/script'

import Navbar from '../../components/Navbar'

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

      <Navbar />

      {/* LOGO */}

      <div
        className="
          fixed
          top-3
          left-5
          md:top-6
          md:left-8
          z-50
        "
      >

        <a href="/">

          <div
            className="
              text-[#3c4696]

              leading-none

              tracking-[-0.0em]

              font-normal

              select-none
            "
            style={{

              fontFamily:
                '"Adobe Text Pro", serif',

              fontSize:
                'clamp(28px, 2.6vw, 42px)',

            }}
          >

            mauropretti

          </div>

        </a>

      </div>

      {/* CONTENT */}

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}

          <GsapReveal
            y={40}
            duration={1.4}
          >

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
                style={{
                  fontFamily:
                    'Inter, Helvetica, Arial, sans-serif',
                }}
              >
                {project.title}
              </h1>

            </div>

          </GsapReveal>

          {/* GALLERY */}

          <div className="flex flex-col gap-10">

            {project.gallery?.map((image: any, index: number) => (

              <GsapReveal
                key={index}
                y={90}
                duration={1.8}
              >

                <div
                  className="
                    flex
                    justify-center
                  "
                >

                  <img
                    src={urlFor(image)
                      .width(1600)
                      .quality(82)
                      .url()}
                    alt={project.title}
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

      <Script id="scroll-top">

        {`
          window.scrollTo(0, 0);
        `}

      </Script>

    </main>
  )
}