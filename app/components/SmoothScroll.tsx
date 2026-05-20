'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SmoothScroll() {

  const pathname = usePathname()

  useEffect(() => {

    // Resetear opacidad del intro siempre al montar
    const intro = document.getElementById('intro-content')
    if (intro) intro.style.opacity = '1'

    // Hard reload si viene de bfcache
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload()
    }
    window.addEventListener('pageshow', handlePageShow)

    const lenis = new Lenis()

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      const intro = document.getElementById('intro-content')
      if (!intro) return
      const opacity = Math.max(1 - scroll / 400, 0)
      intro.style.opacity = opacity.toString()
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      lenis.destroy()
    }

  }, [pathname])

  return null
}