export const dynamic = 'force-dynamic'

import Navbar from '../components/Navbar'
import AppLink from '../components/AppLink'

export default async function LightroomPage() {

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

      {/* CONTENT */}

      <section
        className="
          pt-32
          md:pt-40

          px-6
          md:px-10

          pb-40
        "
      >

        <div className="max-w-[980px]">

          {/* LABEL */}

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

            education

          </p>

          {/* TITLE */}

          <h1
            className="
              text-[30px]
              sm:text-[38px]
              md:text-[54px]
              lg:text-[64px]

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

            Curso Lightroom CC

          </h1>

          {/* DESCRIPTION */}

          <div
            className="
              max-w-[760px]

              text-[15px]
              md:text-[17px]

              leading-[1.8]

              text-black/60

              space-y-8
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            <p>

              Curso orientado a fotógrafos, creativos
              y profesionales que buscan desarrollar un
              flujo de trabajo moderno y eficiente dentro
              de Lightroom CC.

            </p>

            <p>

              El contenido aborda organización,
              revelado, color, exportación,
              optimización para portfolio y procesos
              editoriales utilizados en proyectos
              artísticos y comerciales.

            </p>

            <p>

              Próximamente disponible.

            </p>

          </div>

        </div>

      </section>

    </main>

  )

}