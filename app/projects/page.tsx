import Header from '../components/Header'
export const dynamic = 'force-dynamic'
import GsapReveal from '../components/GsapReveal'
import Link from 'next/link'
import GsapStagger from '../components/GsapStagger'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'

async function getProjects() {

  return client.fetch(`
    *[_type == "project"] | order(order asc) {

      _id,
      title,
      slug,
      coverImage,
      gallery,
      excerpt

    }
  `)
}

export default async function ProjectsPage() {

  const projects = await getProjects()

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">

      <Header />

     
      {/* CONTENT */}
     <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-24">

    {projects
      .filter(
        (project: any) =>
          project.slug?.current &&
          (
            project.coverImage ||
            project.gallery?.[0]
          )
      )
      .map((project: any) => {

        const image =
          project.coverImage ||
          project.gallery?.[0]

        return (

          <GsapReveal
            key={project._id}
            y={80}
            duration={1.8}
          >

            <Link
              href={`/projects/${project.slug.current}`}
              scroll={true}
              className="
                group
                block
                w-full
              "
            >

              {/* IMAGE */}

              <div
                className="
                  relative
                  w-full
                  aspect-[4/3]

                  overflow-hidden
                "
              >

                <img
                  src={urlFor(image)
                    .width(1200)
                    .quality(82)
                    .url()}
                  alt={project.title}
                  className="
                    absolute
                    inset-0

                    w-full
                    h-full

                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-[1.01]
                  "
                />

              </div>

              {/* INFO */}

              <div className="mt-5">

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

              </div>

            </Link>

          </GsapReveal>

        )

      })}

  </div>

</section>

    </main>
  )
}