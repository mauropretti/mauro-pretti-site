'use client'

import {useEffect, useRef} from 'react'

import gsap from 'gsap'

export default function CinematicHero({
  image,
}: {
  image: string
}) {

  const imageRef = useRef(null)

  const textRef = useRef(null)

  useEffect(() => {

    const tl = gsap.timeline()

    tl.fromTo(
      imageRef.current,

      {
        scale: 1.2,
        opacity: 0,
      },

      {
        scale: 1,
        opacity: 0.75,
        duration: 2,
        ease: 'power3.out',
      }
    )

    tl.fromTo(
      textRef.current,

      {
        y: 100,
        opacity: 0,
        filter: 'blur(20px)',
      },

      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out',
      },

      '-=1.2'
    )

  }, [])

  return (

    <section className="relative h-screen overflow-hidden">

      {/* IMAGE */}

      <img
        ref={imageRef}
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}

      <div
        ref={textRef}
        className="relative z-10 h-full flex flex-col justify-end px-8 md:px-20 pb-16 md:pb-24"
      >

        <div className="max-w-7xl">

          <h1 className="text-[14vw] md:text-[7vw] leading-none font-light tracking-[-0.06em] mb-10">
            Mauro
            <br />
            Pretti
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

            <p className="text-xl md:text-3xl leading-relaxed opacity-80 max-w-2xl">
              Photography / Direction / Visual Narratives / Cinematic storytelling
            </p>

            <div className="flex md:justify-end items-end">

              <div className="text-sm uppercase tracking-[0.3em] opacity-40">
                Scroll to explore
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}