import Navbar from './components/Navbar'
import ParallaxImage from './components/ParallaxImage'
export const dynamic = 'force-dynamic'

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
  i === 0
    ? (
        project.coverImage ||
        project.gallery?.[0]
      )
    : project.gallery?.[i]

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