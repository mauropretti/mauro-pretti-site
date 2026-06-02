export const dynamic = 'force-dynamic'

import Header from '../components/Header'
import AppLink from '../components/AppLink'
export default async function LightroomPage() {

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">

      <Header />

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

          curso online a distancia con clases en vivo
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

            Curso Lightroom 

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
              flujo de trabajo eficiente y creativos desde
              Lightroom.

            </p>

            <p>
            </p>

            <p>

              Próximamente disponible.

            </p>

          </div>

        </div>

           </section>

      <footer
        className="
          px-6
          md:px-10

          pb-16
        "
      >

        <div
          className="
            flex
            flex-wrap

            gap-x-4
            gap-y-3

            text-[13px]
            sm:text-[14px]

            tracking-[-0.03em]

            text-black/55
          "
        >

          <AppLink href="/">
            Home
          </AppLink>

          <AppLink href="/publicitaria">
            Publicitaria
          </AppLink>

          <AppLink href="/teatro">
            Teatro
          </AppLink>

          <AppLink href="/el-gesto-intimo">
            El gesto íntimo
          </AppLink>

          <AppLink href="/tienda">
            Tienda
          </AppLink>

        </div>

      </footer>

    </main>

  )

}