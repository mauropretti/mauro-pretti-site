// app/publicitaria/page.tsx

import Header from '../components/Header'

import {client} from '@/sanity/client'

import {urlFor} from '@/sanity/image'

export const dynamic = 'force-dynamic'

async function getPublicitariaProjects() {

  return client.fetch(`
    *[_type == "publicitaria"] | order(year desc){

      _id,

      title,

      slug,

      year,

      client,

      description,

      coverImage,

      gallery

    }
  `)

}

export default async function PublicitariaPage() {

  const projects =
    await getPublicitariaProjects()

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

            archivo comercial / editorial

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

            Publicitaria

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

            Campañas, editoriales y
            producciones visuales centradas
            en narrativa, dirección estética
            y construcción de imagen.

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

            gap-28
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
                    mb-10
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row

                      md:items-end
                      md:justify-between

                      gap-6
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-[24px]
                          md:text-[34px]

                          leading-[1]

                          tracking-[-0.05em]

                          text-black

                          mb-3
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

                        {project.client && (

                          <span>
                            {project.client}
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                  {project.description && (

                    <p
                      className="
                        mt-6

                        text-[14px]
                        md:text-[15px]

                        leading-[1.8]

                        text-black/55

                        max-w-[760px]
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

                {/* GRID */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3

                    gap-4
                    md:gap-5
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
                              .width(1400)
                              .quality(82)
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

              </article>

            )
          )}

        </div>

      </section>

    </main>

  )
}