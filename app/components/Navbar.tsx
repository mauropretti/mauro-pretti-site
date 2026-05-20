import AppLink from './AppLink'

export default function Navbar() {

  return (

    <header
      className="
        fixed
       left-1/2
-translate-x-1/2

w-full
max-w-[1580px]
        w-full
        z-50
        mix-blend-difference
      "
    >

      <div
        className="
          flex
          justify-end

          px-5
          md:px-8

          pt-5
          md:pt-6
        "
      >

        <nav
          className="
            flex
            items-center

            text-[15px]
            sm:text-[16px]
            md:text-[18px]
            lg:text-[19px]

            text-white

            font-light

            tracking-[-0.02em]

            leading-none
          "
          style={{
            fontFamily:
              'Inter, Helvetica, Arial, sans-serif',
          }}
        >

          {/* LEFT */}

          <div
            className="
              flex
              gap-5
              md:gap-8
              lg:gap-10
            "
          >

            <AppLink
              href="/projects"

              className="
                hover:opacity-60
                transition
                duration-500
              "
            >
              Proyectos
            </AppLink>

            <AppLink
              href="/biography"

              className="
                hover:opacity-60
                transition
                duration-500
              "
            >
              Bio
            </AppLink>

          </div>

          {/* SPACE */}

          <div
            className="
              w-8
              md:w-12
              lg:w-16
            "
          />

          {/* CONTACT */}

          <AppLink
            href="/contact"

            className="
              hover:opacity-60
              transition
              duration-500
            "
          >
            Contacto
          </AppLink>

        </nav>

      </div>

    </header>
  )
}