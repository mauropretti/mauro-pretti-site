import Script from 'next/script'

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

    <main className="bg-[#f4f4f1] text-black min-h-screen">

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

      {/* INTRO */}

      <section
        className="
          fixed
          inset-0

          z-0

          px-6
          sm:px-8
          md:px-10

          pt-28
          sm:pt-32
          md:pt-40

          pointer-events-none
        "
      >

        <div
          id="intro-content"
          className="
            w-full

            max-w-[92vw]
            sm:max-w-[680px]
            md:max-w-[760px]
            lg:max-w-[920px]
            xl:max-w-[1080px]
          "
        >

          <h2
            className="
              text-[18px]
              sm:text-[20px]
              md:text-[22px]
              lg:text-[26px]

              leading-[1.1]

              tracking-[-0.03em]

              text-black
            "
            style={{
              fontFamily:
                'Satoshi, Inter, sans-serif',
            }}
          >

            Fotografía artística y publicitaria

          </h2>

          <p
            className="
              mt-5
              sm:mt-6

              text-[14px]
              sm:text-[15px]
              md:text-[17px]

              leading-[1.55]
              sm:leading-[1.6]

              tracking-[-0.02em]

              text-black/75

              max-w-[92vw]
              sm:max-w-[560px]
              md:max-w-[680px]
              lg:max-w-[820px]
            "
            style={{
              fontFamily:
                'Satoshi, Inter, sans-serif',
            }}
          >

            Está abocado a la fotografía creativa en su búsqueda
            de expresar y materializar diferentes experiencias y etapas
            utilizando elementos de la naturaleza, el cuerpo humano
            y la arquitectura.

          </p>

          <a
            href="/lightroom"

            className="
              inline-flex

              mt-7
              sm:mt-8

              rounded-full

              border
              border-black/10

              px-4
              py-2

              text-[12px]
              sm:text-[13px]

              tracking-[-0.02em]

              text-black/80

              transition-all
              duration-500

              hover:bg-black
              hover:text-white
            "
            style={{
              fontFamily:
                'Satoshi, Inter, sans-serif',
            }}
          >

            Curso Lightroom

          </a>

        </div>

      </section>

      {/* STACK */}

      <section
        className="
          relative
          z-20

          pt-[52vh]
          md:pt-[58vh]

          pb-40
        "
      >

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

      <Script id="intro-fade">

        {`
          const handleScroll = () => {

            const intro =
              document.getElementById(
                'intro-content'
              )

            if (!intro) return

            const scrollY =
              window.scrollY

            const opacity =
              Math.max(
                1 - scrollY / 400,
                0
              )

            intro.style.opacity =
              opacity.toString()

          }

          window.addEventListener(
            'scroll',
            handleScroll
          )
        `}

      </Script>

    </main>

  )
}