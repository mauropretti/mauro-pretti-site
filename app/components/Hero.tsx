'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'

export default function Hero({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {

  const heroRef = useRef(null)

  useEffect(() => {

    gsap.fromTo(
      heroRef.current,

      {
        opacity: 0,
        y: 120,
        filter: 'blur(20px)',
      },

      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'power4.out',
      }
    )

  }, [])

  return (

    <section className="h-screen flex flex-col items-center justify-center px-10">

      <div ref={heroRef}>

        <h1 className="text-7xl md:text-9xl font-light tracking-tight mb-6 text-center">
          {title}
        </h1>

        <p className="text-xl opacity-70 max-w-2xl text-center">
          {subtitle}
        </p>

      </div>

    </section>
  )
}