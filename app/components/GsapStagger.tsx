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
}

export default function GsapStagger({
  children,
}: Props) {

  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    if (!ref.current) return

    const items = ref.current.children

    gsap.fromTo(
      items,

      {
        opacity: 0,
        y: 80,
        filter: 'blur(10px)',
      },

      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',

        duration: 1.6,

        stagger: 0.12,

        ease: 'power3.out',

        scrollTrigger: {

          trigger: ref.current,

          start: 'top 88%',

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