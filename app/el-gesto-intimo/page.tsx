// app/el-gesto-intimo/page.tsx

'use client'

import Header from '../components/Header'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'

import {useEffect, useState} from 'react'

export const dynamic = 'force-dynamic'

async function getGestoIntimoProjects() {

  return client.fetch(`
    *[_type == "gestoIntimo"] | order(year desc){

      _id,

      title,

      slug,

      year,

      subtitle,

      curatorialText,

      poem,

      coverImage,

      gallery

    }
  `)

}

export default function GestoIntimoPage() {

  const [projects, setProjects] =
    useState<any[]>([])

  useEffect(() => {

    getGestoIntimoProjects()
      .then(setProjects)

  }, [])

  const {scrollY} = useScroll()

  const infoOpacity =
    useTransform(
      scrollY,
      [0, 220],
      [1, 0]
    )

  return (

    <main
      className="
        bg-[#f4f4f1]
        text-black
        min-h-screen
        overflow-hidden
      "
    >

      <Header />

      {/* FIXED OVERLAY HERO — mismo sistema exacto que Header */}

      <div
        className="
          fixed
          inset-0
          z-30
          pointer-events-none
        "
      >

        {/* capa centrada igual que Header */}
        <div
          className="
            relative
            w-full
            max-w-[1580px]
            h-full
            mx-auto
          "
        >

          {/* contenido pegado top-left igual que el logo */}
          <div
            className="
              absolute
              top-3
              left-5
              md:top-6
              md:left-8
              pt-12
              sm:pt-14
              md:pt-18
              w-[980px]
              max-w-[calc(100%-40px)]
            "
          >

            {/* LABEL */}

            <motion.div
              style={{
                opacity:
                  infoOpacity,
              }}
            >

              <p
                className="
                  text-[11px]
                  sm:text-[12px]
                  md:text-[13px]

                  lowercase

                  tracking-[-0.01em]

                  text-[#4940d8]/70

                  mb-5
                "
                style={{
                  fontFamily:
                    'Inter, Helvetica, Arial, sans-serif',
                }}
              >

                pieza expositiva / narrativa visual

              </p>

            </motion.div>

            {/* FIXED TITLE */}

            <h1
              className="
                editorial-title

                sticky
                top-10
                md:top-14

                z-50

                opacity-90

                mix-blend-multiply

                text-[42px]
                sm:text-[56px]
                md:text-[82px]
                lg:text-[110px]

                tracking-[-0.03em]

                mb-5
              "
            >

              EL GESTO ÍNTIMO

            </h1>

            {/* CURATORIAL */}

            {projects?.[0] && (

              <motion.div
                style={{
                  opacity:
                    infoOpacity,
                }}
              >

                <div
                  className="
                    flex
                    flex-wrap

                    gap-x-4
                    md:gap-x-5

                    gap-y-2

                    text-[12px]
                    sm:text-[13px]
                    md:text-[14px]

                    text-black/45

                    mb-6
                  "
                  style={{
                    fontFamily:
                      'Inter, Helvetica, Arial, sans-serif',
                  }}
                >

                  {projects[0].year && (

                    <span>
                      {projects[0].year}
                    </span>

                  )}

                  {projects[0].subtitle && (

                    <span>
                      {projects[0].subtitle}
                    </span>

                  )}

                </div>

                {projects[0].curatorialText && (

                  <p
                    className="
                      text-[22px]
                      sm:text-[26px]
                      md:text-[34px]

                      leading-[1.3]
                      md:leading-[1.28]

                      tracking-[-0.035em]

                      text-black/80
                    "
                    style={{
                      fontFamily:
                        'Inter, Helvetica, Arial, sans-serif',
                    }}
                  >

                    {projects[0].curatorialText}

                  </p>

                )}

              </motion.div>

            )}

          </div>

        </div>

      </div>

      {/* SPACER — en mobile más alto para que el hero no tape la galería */}

      <section
        className="
          relative

          h-[60vh]
          sm:h-[56vh]
          md:h-[64vh]
        "
      />

      {/* PROJECTS */}

      <section
        className="
          relative

          z-10

          pb-28
          md:pb-40
        "
      >

        <div
          className="
            flex
            flex-col

            gap-24
            md:gap-40
          "
        >

          {projects.map(
            (project: any) => (

              <article
                key={project._id}
              >

                {/* HORIZONTAL DRIFT */}

                <div
                  className="
                    overflow-x-auto
                    md:overflow-hidden

                    w-full

                    scrollbar-hide gesto-scroll-mobile
                  "
                >

                  <div
                    className="
                      gesto-track

                      flex
                      items-center

                      gap-4
                      sm:gap-5
                      md:gap-8

                      w-max

                      px-5
                      sm:px-7
                      md:px-0
                    "
                  >

                    {[
                      ...(project.gallery || []),
                      ...(project.gallery || [])
                    ].map(
                      (
                        image: any,
                        index: number
                      ) => (

                        <div
                          key={index}

                          className={`
                            gesto-item

                            flex-shrink-0

                            transition-transform
                            duration-700

                            ${
                              index % 2 === 0
                                ? 'md:mt-14'
                                : ''
                            }

                            ${
                              index % 3 === 0
                                ? 'md:-mt-8'
                                : ''
                            }

                            ${
                              index % 4 === 0
                                ? '-ml-3 md:-ml-5'
                                : ''
                            }

                            ${
                              index % 5 === 0
                                ? 'mr-8'
                                : 'mr-3'
                            }

                            ${
                              index % 6 === 0
                                ? 'scale-[0.92]'
                                : ''
                            }

                            ${
                              index % 7 === 0
                                ? 'scale-[1.04]'
                                : ''
                            }
                          `}
                        >

                          <img
                            src={
                              urlFor(image)
                                .width(1600)
                                .quality(84)
                                .url()
                            }

                            alt={`${project.title} – fotografía ${index + 1}`}

                            className={`
                              w-auto

                              object-contain

                              pointer-events-auto

                              select-none

                              transition-all
                              duration-700

                              ${
                                index % 3 === 0
                                  ? 'h-[28vh] sm:h-[34vh] md:h-[54vh]'
                                  : ''
                              }

                              ${
                                index % 3 === 1
                                  ? 'h-[38vh] sm:h-[48vh] md:h-[76vh]'
                                  : ''
                              }

                              ${
                                index % 3 === 2
                                  ? 'h-[32vh] sm:h-[40vh] md:h-[62vh]'
                                  : ''
                              }
                            `}
                          />

                        </div>

                      )
                    )}

                  </div>

                </div>

                {/* POEM */}

                {project.poem && (

                  <div
                    className="
                      px-5
                      sm:px-7
                      md:px-10

                      mt-16
                      md:mt-24

                      max-w-[980px]
                    "
                  >

                    <p
                      className="
                        text-[20px]
                        sm:text-[24px]
                        md:text-[18px]

                        leading-[1.42]

                        tracking-[-0.035em]

                        text-black/80

                        whitespace-pre-line
                      "
                      style={{
                        fontFamily:
                          'Inter, Helvetica, Arial, sans-serif',
                      }}
                    >

                      {project.poem}

                    </p>

                  </div>

                )}

              </article>

            )
          )}

        </div>

      </section>

    </main>

  )

}