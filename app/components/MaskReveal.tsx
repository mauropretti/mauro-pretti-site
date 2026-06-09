'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function MaskReveal({
  children,
}: {
  children: React.ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!maskRef.current) return

    gsap.to(maskRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power3.out',
    })
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden"
    >
      <div>{children}</div>

      <div
        ref={maskRef}
        className="
          absolute
          inset-0
          bg-[#f4f4f1]
          pointer-events-none
        "
      />
    </div>
  )
}