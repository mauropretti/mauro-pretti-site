import Header from './components/Header'
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

      <Header />
      {/* INTRO */}

      <section
  className="
    fixed
    top-0

    left-1/2
    -translate-x-1/2

    w-full
    max-w-[1580px]

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

            Desde la fotografía creativa, desarrolla atmósferas contemplativas que invitan a una observación sensible, evocando imaginarios del inconsciente colectivo atravesados por el goce y la reinterpretación. Sus imágenes abordan vivencias, recuerdos y percepciones íntimas intervenidas por el cuerpo, la naturaleza y la arquitectura.

          </p>

          {/* LINKS */}

<div
  className="
    pointer-events-auto
    relative
    z-50

    flex

    items-end

    gap-x-5
    sm:gap-x-6

    mt-7
    sm:mt-8
  "
>

  {/* LIGHTROOM */}

  <div
    className="
      flex
      flex-col

 items-end
      mr-1
    "
  >

    <span
  className="
    inline-flex

    

    bg-black/70

    px-[3px]
    py-[2px]

    text-[7px]

    uppercase

    tracking-[0.12em]

    text-white

    leading-none

    -mb-[3px]
  "
  style={{
    fontFamily:
      'Satoshi, Inter, sans-serif',
  }}
>

  Curso

</span>

    <AppLink
      href="/lightroom"

      className="
        text-[13px]
        sm:text-[14px]

        tracking-[-0.03em]

        text-black/80

        transition-opacity
        duration-500

        hover:opacity-40
      "
      style={{
        fontFamily:
          'Satoshi, Inter, sans-serif',
      }}
    >

      Lightroom

    </AppLink>

  </div>

  {/* PUBLICITARIA */}

  <AppLink
    href="/publicitaria"

    className="
      text-[13px]
      sm:text-[14px]

      tracking-[-0.03em]

      text-black/55

      transition-opacity
      duration-500

      hover:opacity-40
    "
    style={{
      fontFamily:
        'Satoshi, Inter, sans-serif',
    }}
  >

    Publicitaria

  </AppLink>

  {/* TEATRO */}

  <AppLink
    href="/teatro"

    className="
      text-[13px]
      sm:text-[14px]

      tracking-[-0.03em]

      text-black/55

      transition-opacity
      duration-500

      hover:opacity-40
    "
    style={{
      fontFamily:
        'Satoshi, Inter, sans-serif',
    }}
  >

    Teatro

  </AppLink>

  {/* GESTO */}

  <AppLink
    href="/el-gesto-intimo"

    className="
      text-[13px]
      sm:text-[14px]

      tracking-[-0.03em]

      text-black/55

      transition-opacity
      duration-500

      hover:opacity-40
    "
    style={{
      fontFamily:
        'Satoshi, Inter, sans-serif',
    }}
  >

    El gesto íntimo

  </AppLink>

</div>

        </div>

      </section>

      {/* STACK */}

      <section
        className="
            home-stack
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