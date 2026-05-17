import Navbar from './components/Navbar'
import ParallaxImage from './components/ParallaxImage'

import {client} from '@/sanity/client'
import {urlFor} from '@/sanity/image'
async function getProjects() {

  return client.fetch(`
    *[_type == "project"]{
      _id,
      title,
      slug,
      gallery,
      coverImage
    }
  `)

}

export default async function HomePage() {

  const projects = await getProjects()

  const mixedImages: any[] = []

  // MIX ENTRE PROYECTOS

  for (let i = 0; i < 10; i++) {

    projects.forEach((project: any) => {

     const image =
  project.gallery?.[i] ||
  (i === 0 ? project.coverImage : null)

if (image) {

  mixedImages.push({
    image,
    slug: project.slug?.current,
    title: project.title,
  })

}

    })

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

      </div>

      {/* STACK */}

      <section className="pt-32 md:pt-40 pb-40">

        <div className="flex flex-col items-center">

          {mixedImages.map((item: any, index: number) => (

            <a
              key={index}
              href={`/projects/${item.slug}`}
              className={`
                group
                block
                mb-20
                md:mb-28

                ${
                  index % 4 === 0
                    ? 'self-start ml-[8vw]'
                    : index % 4 === 1
                    ? 'self-end mr-[10vw]'
                    : index % 4 === 2
                    ? 'self-center'
                    : 'self-start ml-[18vw]'
                }
              `}
            >

              {/* IMAGE */}

              <div
                className={`
                  overflow-visible
                  bg-[#ecece8]

                  ${
                    index % 4 === 0
                      ? 'w-[72vw] sm:w-[58vw] md:w-[28vw] lg:w-[32vw]'
                      : index % 4 === 1
                      ? 'w-[58vw] sm:w-[46vw] md:w-[22vw] lg:w-[26vw]'
                      : index % 4 === 2
                      ? 'w-[84vw] sm:w-[72vw] md:w-[36vw] lg:w-[40vw]'
                      : 'w-[64vw] sm:w-[52vw] md:w-[24vw] lg:w-[28vw]'
                  }
                `}
              >

                <ParallaxImage
                  src={urlFor(item.image).width(1600).url()}
                  alt={item.title}
                />

              </div>

            </a>

          ))}

        </div>

      </section>

    </main>

  )
}