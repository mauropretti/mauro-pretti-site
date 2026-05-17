import Navbar from '../components/Navbar'

export default function ContactPage() {

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

        <div className="max-w-[900px]">

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
            contacto
          </p>

          {/* TITLE */}

          <h1
            className="
              text-[28px]
              sm:text-[34px]
              md:text-[48px]
              lg:text-[58px]

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
            consultas, mensajes, escribime a
          </h1>

          {/* CONTACT INFO */}

          <div
            className="
              flex
              flex-col

              gap-8

              text-[16px]
              md:text-[18px]

              leading-[1.8]

              text-black/55
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            <a
              href="mailto:hola@mauropretti.com"
              className="
                hover:text-black
                transition
                duration-500
              "
            >
              hola@mauropretti.com
            </a>

            <a
              href="https://instagram.com/mauropretti_"
              target="_blank"
              className="
                hover:text-black
                transition
                duration-500
              "
            >
              Instagram
            </a>

          </div>

        </div>

      </section>

    </main>
  )
}