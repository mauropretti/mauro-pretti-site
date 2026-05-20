import Navbar from './components/Navbar'
import ProjectLink from './components/ProjectLink'
import AppLink from './components/AppLink'

export const dynamic = 'force-dynamic'

import {client} from '@/sanity/client'

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

      {/* LOGO */}

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

        <AppLink href="/">

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

        </AppLink>

      </div>

      {/* INTRO */}

      <section
        className="
          fixed
          top-0
          left-0
          right-0

          h-auto

          z-30

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

          {/* LINKS */}

<div
  className="
    pointer-events-auto
    relative
    z-50

    flex
    flex-wrap

    items-center

    gap-x-6
    gap-y-3

    mt-7
    sm:mt-8
  "
>

  {/* LIGHTROOM */}

  <AppLink
    href="/lightroom"

    className="
      inline-flex

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

  </AppLink>

  {/* INLINE LINKS */}

  <div
    className="
      flex
      flex-wrap

      items-center

      gap-x-5
      sm:gap-x-6

      text-[13px]
      sm:text-[14px]
      md:text-[15px]

      tracking-[-0.03em]

      text-black/55
    "
    style={{
      fontFamily:
        'Satoshi, Inter, sans-serif',
    }}
  >

    <AppLink
      href="/publicitaria"

      className="
        transition-opacity
        duration-500

        hover:opacity-40
      "
    >

      Publicitaria

    </AppLink>

    <AppLink
      href="/teatro"

      className="
        transition-opacity
        duration-500

        hover:opacity-40
      "
    >

      Teatro

    </AppLink>

    <AppLink
      href="/el-gesto-intimo"

      className="
        transition-opacity
        duration-500

        hover:opacity-40
      "
    >

      El gesto íntimo

    </AppLink>

  </div>

</div>

        </div>

      </section>

      {/* STACK */}

      <section
        className="
          relative
          z-10

          pt-[52vh]
          md:pt-[58vh]

          pb-40
        "
      >

        <div className="flex flex-col items-center">

          {mixedImages.map((item: any, index: number) => (

            <ProjectLink
              key={index}
              item={item}
              index={index}
            />

          ))}

        </div>

      </section>

    </main>

  )
}