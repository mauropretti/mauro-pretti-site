'use client'

import {
  useRef,
  ReactNode,
} from 'react'

import gsap from 'gsap'

import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

import {
  useGSAP,
} from '@gsap/react'

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP
)

type Props = {
  children: ReactNode
  y?: number
  delay?: number
  duration?: number
}

export default function GsapReveal({
  children,
  y = 40,
  delay = 0,
  duration = 1.4,
}: Props) {

  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      {
        y,
        opacity: 0,
        filter: 'blur(8px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 92%',
          once: true,
        },
      }
    )

  }, [])

  return (

    <div ref={ref}>
      {children}
    </div>

  )
}