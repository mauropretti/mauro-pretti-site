'use client'

import {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function RevealImage({
  src,
}: {
  src: string
}) {

  const imageRef = useRef(null)

  useEffect(() => {

    gsap.fromTo(
      imageRef.current,

      {
        opacity: 0,
        y: 120,
        filter: 'blur(20px)',
      },

      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
        },
      }
    )

  }, [])

  return (

    <img
      ref={imageRef}
      src={src}
      alt=""
      className="w-full rounded-3xl"
    />
  )
}