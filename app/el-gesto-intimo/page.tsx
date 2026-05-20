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
      "
    >

      <Header />

      {/* HERO */}

      <section
        className="
          px-6
          sm:px-8
          md:px-10

          pt-32
          md:pt-40

          pb-20
        "
      >

        <div
          className="
            max-w-[920px]
          "
        >

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

            pieza expositiva / narrativa visual

          </p>

          <h1
            className="
              text-[34px]
              sm:text-[42px]
              md:text-[58px]
              lg:text-[72px]

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

            El gesto íntimo

          </h1>

          <p
            className="
              text-[15px]
              md:text-[17px]

              leading-[1.8]

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
          px-6
          sm:px-8
          md:px-10

          pb-40
        "
      >

        <div
          className="
            flex
            flex-col

            gap-36
          "
        >

          {projects.map(
            (project: any) => (

              <article
                key={project._id}
              >

                {/* HEADER */}

                <div
                  className="
                    mb-14
                  "
                >

                  <div
                    className="
                      flex
                      flex-col

                      gap-5
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-[26px]
                          md:text-[40px]

                          leading-[0.95]

                          tracking-[-0.05em]

                          text-black

                          mb-4
                        "
                        style={{
                          fontFamily:
                            'Inter, Helvetica, Arial, sans-serif',
                        }}
                      >

                        {project.title}

                      </h2>

                      <div
                        className="
                          flex
                          flex-wrap

                          gap-x-5
                          gap-y-2

                          text-[13px]
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

                    </div>

                    {project.curatorialText && (

                      <p
                        className="
                          text-[15px]
                          md:text-[17px]

                          leading-[1.9]

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

                {/* GRID */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2

                    gap-5
                    md:gap-6
                  "
                >

                  {project.gallery?.map(
                    (
                      image: any,
                      index: number
                    ) => (

                      <div
                        key={index}

                        className="
                          overflow-hidden

                          bg-[#ecece8]
                        "
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
                            w-full
                            h-auto

                            object-cover
                          "
                        />

                      </div>

                    )
                  )}

                </div>

                {/* POEM */}

                {project.poem && (

                  <div
                    className="
                      mt-16

                      max-w-[620px]
                    "
                  >

                    <p
                      className="
                        text-[15px]
                        md:text-[17px]

                        leading-[2]

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