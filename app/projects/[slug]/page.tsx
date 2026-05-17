import Navbar from '../../components/Navbar'

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

      {/* FIXED LOGO */}

      <div
        className="
          fixed
          top-5
          left-5
          md:top-6
          md:left-8
          z-50
        "
      >

        <a href="/">

          <img
            src="/logo.png"
            alt="Mauro Pretti"
            className="
              w-[120px]
              sm:w-[140px]
              md:w-[170px]
              lg:w-[190px]
              h-auto
            "
          />

        </a>

      </div>

      {/* CONTENT */}

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

        <div className="max-w-[1200px] mx-auto">

          {/* HEADER */}

          <div
            className="
              mb-20

              opacity-0

              animate-[fadeImage_2.2s_cubic-bezier(0.22,1,0.36,1)_forwards]
            "
          >

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-start
                md:justify-between
                gap-10
              "
            >

              <div>

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

                {project.description && (

                  <p
                    className="
                      mt-8

                      text-[15px]
                      md:text-[17px]

                      leading-[1.9]

                      text-black/60

                      max-w-[720px]

                      whitespace-pre-line
                    "
                    style={{
                      fontFamily:
                        'Inter, Helvetica, Arial, sans-serif',
                    }}
                  >
                    {project.description}
                  </p>

                )}

              </div>

            </div>

          </div>

          {/* COVER */}

          {project.coverImage && (

            <div
              className="
                overflow-hidden
                mb-10
                bg-[#ecece8]

                opacity-0

                animate-[fadeImage_2.2s_cubic-bezier(0.22,1,0.36,1)_forwards]
              "
            >

              <img
                src={urlFor(project.coverImage)
                  .width(2200)
                  .quality(100)
                  .url()}
                alt={project.title}
                className="
                  w-full
                  h-auto
                  object-cover

                  transition
                  duration-[2200ms]
                  ease-out

                  hover:scale-[1.01]
                "
              />

            </div>

          )}

          {/* GALLERY */}

          <div className="flex flex-col gap-10">

            {project.gallery?.map((image: any, index: number) => (

              <div
                key={index}
                className="
                  overflow-hidden
                  bg-[#ecece8]

                  opacity-0

                  animate-[fadeImage_2.2s_cubic-bezier(0.22,1,0.36,1)_forwards]
                "
                style={{
                  animationDelay: `${index * 140}ms`,
                }}
              >

                <img
                  src={urlFor(image)
                    .width(2200)
                    .quality(100)
                    .url()}
                  alt={project.title}
                  className="
                    w-full
                    h-auto
                    object-cover

                    transition
                    duration-[2200ms]
                    ease-out

                    hover:scale-[1.01]
                  "
                />

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  )
}