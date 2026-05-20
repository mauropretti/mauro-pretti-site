'use client'

import {useEffect, useRef} from 'react'
import Link from 'next/link'

export default function EditorialIntro() {

  const introRef =
    useRef<HTMLDivElement>(null)

  useEffect(() => {

    const updateIntro = () => {

      if (!introRef.current) return

      const scrollY =
        window.scrollY

      const opacity =
        Math.max(
          1 - scrollY / 220,
          0
        )

      introRef.current.style.opacity =
        opacity.toString()

    }

    updateIntro()

    window.addEventListener(
      'scroll',
      updateIntro,
      {passive: true}
    )

    return () => {

      window.removeEventListener(
        'scroll',
        updateIntro
      )

    }

  }, [])

  return (

    <section
      className="
        fixed

        top-0
        left-0
        right-0

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
        ref={introRef}

        className="
          w-full

          max-w-[92vw]
          sm:max-w-[680px]
          md:max-w-[760px]
          lg:max-w-[920px]

          transition-opacity
          duration-300

          will-change-[opacity]
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

        <div
          className="
            pointer-events-auto
            relative
            z-50
          "
        >

          <Link
            href="/lightroom"
            scroll={false}

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

          </Link>

        </div>

      </div>

    </section>

  )
}