import Navbar from './Navbar'
import AppLink from './AppLink'

export default function Header() {

  return (

    <>

      {/* NAVBAR ORIGINAL */}

      <Navbar />

      {/* LOGO LIMITADO */}

      <div
        className="
          fixed

          top-0

          left-1/2
          -translate-x-1/2

          w-full
          max-w-[1580px]

          pointer-events-none

          z-50
        "
      >

        <div
          className="
            absolute
            top-3
            left-5

            md:top-6
            md:left-8

            pointer-events-auto
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

      </div>

    </>

  )

}