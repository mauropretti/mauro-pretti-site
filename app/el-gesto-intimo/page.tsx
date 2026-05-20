// app/el-gesto-intimo/page.tsx

import Header from '../components/Header'

import {client} from '@/sanity/client'

import {urlFor} from '@/sanity/image'

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

export default async function GestoIntimoPage() {

  const projects =
    await getGestoIntimoProjects()

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

      {/* HERO */}

      <section
        className="
          px-5
          sm:px-7
          md:px-10

          pt-24
          sm:pt-28
          md:pt-40

          pb-16
          md:pb-20
        "
      >

        <div className="max-w-[920px]">

          <p
            className="
              text-[11px]
              sm:text-[12px]
              md:text-[13px]

              lowercase

              tracking-[-0.01em]

              text-[#4940d8]/70

              mb-5
              md:mb-6
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            pieza expositiva / narrativa visual

          </p>

          <h1
            className="
              text-[32px]
              sm:text-[42px]
              md:text-[58px]
              lg:text-[68px]

              leading-[0.92]

              tracking-[-0.06em]

              font-light

              text-[#4940d8]

              mb-8
              md:mb-10
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            El gesto íntimo

          </h1>

          <p
            className="
              text-[14px]
              sm:text-[15px]
              md:text-[17px]

              leading-[1.75]
              md:leading-[1.8]

              text-black/55

              max-w-[760px]
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            Un recorrido visual centrado
            en el cuerpo, la memoria,
            la intimidad y la presencia.

          </p>

        </div>

      </section>

      {/* PROJECTS */}

      <section
        className="
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

                {/* INFO */}

                <div
                  className="
                    px-5
                    sm:px-7
                    md:px-10

                    mb-12
                    md:mb-20
                  "
                >

                  <div
                    className="
                      flex
                      flex-col

                      gap-4
                      md:gap-5
                    "
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
                      "
                      style={{
                        fontFamily:
                          'Inter, Helvetica, Arial, sans-serif',
                      }}
                    >

                      {project.year && (

                        <span>
                          {project.year}
                        </span>

                      )}

                      {project.subtitle && (

                        <span>
                          {project.subtitle}
                        </span>

                      )}

                    </div>

                    {project.curatorialText && (

                      <p
                        className="
                          text-[14px]
                          sm:text-[15px]
                          md:text-[17px]

                          leading-[1.8]
                          md:leading-[1.9]

                          text-black/55

                          max-w-[760px]
                        "
                        style={{
                          fontFamily:
                            'Inter, Helvetica, Arial, sans-serif',
                        }}
                      >

                        {project.curatorialText}

                      </p>

                    )}

                  </div>

                </div>

                {/* HORIZONTAL DRIFT */}

                <div
                  className="
                    overflow-x-auto
                    md:overflow-hidden

                    w-full

                    scrollbar-hide
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

                            ${
                              index % 3 === 0
                                ? 'md:mt-20'
                                : ''
                            }

                            ${
                              index % 5 === 0
                                ? 'md:-mt-8'
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

                            alt={
                              project.title
                            }

                            className="
                              h-[34vh]
                              sm:h-[44vh]
                              md:h-[68vh]

                              w-auto

                              object-contain

                              pointer-events-auto

                              select-none
                            "
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

                      max-w-[620px]
                    "
                  >

                    <p
                      className="
                        text-[14px]
                        sm:text-[15px]
                        md:text-[17px]

                        leading-[1.9]
                        md:leading-[2]

                        tracking-[-0.02em]

                        text-black/45

                        whitespace-pre-line
                      "
                      style={{
                        fontFamily:
                          '"Adobe Text Pro", serif',
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