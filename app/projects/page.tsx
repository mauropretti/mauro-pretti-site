import Navbar from '../components/Navbar'

import Link from 'next/link'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProjects() {

  return client.fetch(`
    *[_type == "project"] | order(_createdAt desc) {

      _id,
      title,
      slug,
      coverImage,
      gallery,
      excerpt,
      category,
      year

    }
  `)
}

export default async function ProjectsPage() {

  const projects = await getProjects()

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24 items-start">

          {projects
            .filter(
              (project: any) =>
                project.slug?.current &&
                (
                  project.coverImage ||
                  project.gallery?.[0]
                )
            )
            .map((project: any, index: number) => {

              const image =
                project.coverImage ||
                project.gallery?.[0]

              return (

                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className="
                    group
                    block
                    w-full

                    opacity-0

                    animate-[fadeImage_1.5s_ease-out_forwards]
                  "
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >

                  {/* IMAGE */}

                  <div
                    className="
                      overflow-hidden
                      bg-[#ecece8]
                    "
                  >

                    <img
                      src={urlFor(image)
                        .width(1800)
                        .quality(100)
                        .url()}
                      alt={project.title}
                      className="
                        w-full
                        h-auto
                        object-cover

                        transition
                        duration-[1600ms]
                        ease-out

                        group-hover:scale-[1.015]
                      "
                    />

                  </div>

                  {/* INFO */}

                  <div className="mt-5">

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-6
                      "
                    >

                      <div>

                        <h2
                          className="
                            text-[22px]
                            md:text-[28px]

                            leading-[0.95]

                            tracking-[-0.05em]

                            font-light

                            text-[#4940d8]
                          "
                          style={{
                            fontFamily:
                              'Inter, Helvetica, Arial, sans-serif',
                          }}
                        >
                          {project.title}
                        </h2>

                        {project.excerpt && (

                          <p
                            className="
                              mt-3

                              text-[14px]
                              md:text-[15px]

                              leading-[1.6]

                              text-black/55

                              max-w-[440px]
                            "
                            style={{
                              fontFamily:
                                'Inter, Helvetica, Arial, sans-serif',
                            }}
                          >
                            {project.excerpt}
                          </p>

                        )}

                      </div>

                      <div
                        className="
                          text-right

                          text-[11px]

                          uppercase

                          tracking-[0.12em]

                          text-black/35
                        "
                        style={{
                          fontFamily:
                            'Inter, Helvetica, Arial, sans-serif',
                        }}
                      >

                        {project.category && (
                          <p>{project.category}</p>
                        )}

                        {project.year && (
                          <p className="mt-1">
                            {project.year}
                          </p>
                        )}

                      </div>

                    </div>

                  </div>

                </Link>

              )

            })}

        </div>

      </section>

    </main>
  )
}