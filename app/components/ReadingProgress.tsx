'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ReadingProgress({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        opacity: 0.25,
      },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <p
      ref={ref}
      className="
        leading-[1.8]
        text-black
      "
    >
      {children}
    </p>
  )
}