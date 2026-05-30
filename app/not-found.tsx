
import Header from './components/Header'
import AppLink from './components/AppLink'

export default function NotFound() {

  return (

    <main
      className="
        bg-[#f4f4f1]
        text-black
        min-h-screen
        overflow-hidden
      "
    >

      <Header />

      <section
        className="
          pt-32
          md:pt-40

          px-6
          md:px-10

          pb-40
        "
      >

        <div className="max-w-[900px]">

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
            error 404
          </p>

          <h1
            className="
              text-[34px]
              sm:text-[44px]
              md:text-[62px]

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
            Esta página no existe.
          </h1>

          <p
            className="
              text-[16px]
              md:text-[18px]

              leading-[1.8]

              text-black/55

              max-w-[720px]

              mb-16
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            El enlace puede haber cambiado o la página ya no estar disponible.
          </p>

          <div
            className="
              flex
              flex-col

              gap-5

              text-[16px]
              md:text-[18px]
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            <AppLink href="/">
              Inicio
            </AppLink>

            <AppLink href="/projects">
              Proyectos
            </AppLink>

            <AppLink href="/el-gesto-intimo">
              El gesto íntimo
            </AppLink>

            <AppLink href="/publicitaria">
              Publicitaria
            </AppLink>

            <AppLink href="/teatro">
              Teatro
            </AppLink>

            <AppLink href="/biography">
              Biografía
            </AppLink>

            <AppLink href="/contact">
              Contacto
            </AppLink>

          </div>

        </div>

      </section>

    </main>

  )
}

