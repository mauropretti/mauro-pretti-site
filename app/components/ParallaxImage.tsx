'use client'

import {useEffect, useRef} from 'react'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage({
  src,
  alt,
}: {
  src: string
  alt?: string
}) {

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const element = wrapperRef.current

    if (!element) return

    ScrollTrigger.create({

      trigger: element,

      start: 'top bottom',
      end: 'bottom top',

      onUpdate: () => {

        const rect = element.getBoundingClientRect()

        const viewportCenter = window.innerHeight / 2

        const elementCenter = rect.top + rect.height / 2

        const distance = Math.abs(
          viewportCenter - elementCenter
        )

        const maxDistance = window.innerHeight / 2

        // NORMALIZACIÓN

        const progress = Math.max(
          0,
          1 - distance / maxDistance
        )

        // OPACITY DINÁMICA

        const opacity = 0.3 + progress * 0.7

        gsap.to(element, {
          opacity,
          duration: 0.2,
          overwrite: true,
        })
      },
    })

  }, [])

  return (

    <div
      ref={wrapperRef}
      className="opacity-[0.3]"
    >

      <img
        src={src}
        alt={alt || ''}
        className="
          w-full
          h-auto
          block
        "
      />

    </div>
  )
}