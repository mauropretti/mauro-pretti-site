'use client'

import { useState, useRef } from 'react'

interface ProductGalleryProps {
  coverImage: string | null
  galleryImages?: string[]
  thumbUrls?: string[]
  title: string
}

export default function ProductGallery({
  coverImage,
  galleryImages = [],
  thumbUrls = [],
  title,
}: ProductGalleryProps) {

  const allImages = [
    ...(coverImage ? [coverImage] : []),
    ...galleryImages,
  ]

  const [selected, setSelected] = useState(0)
  const [fading, setFading] = useState(false)
  const touchStartX = useRef<number | null>(null)

  if (allImages.length === 0) return null

  function switchTo(index: number) {
    if (index === selected) return
    setFading(true)
    setTimeout(() => {
      setSelected(index)
      setFading(false)
    }, 200)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta < 0) {
      switchTo(Math.min(selected + 1, allImages.length - 1))
    } else {
      switchTo(Math.max(selected - 1, 0))
    }
  }

  return (
    <div className="w-full mb-12">

      {/* Imagen principal — sin fondo */}
      <div
        className="relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ aspectRatio: '4/3', maxWidth: '900px' }}
      >
        <img
          key={selected}
          src={allImages[selected]}
          alt={`${title} — imagen ${selected + 1}`}
          className="w-full h-full object-contain select-none"
          style={{
            transition: 'opacity 0.2s ease',
            opacity: fading ? 0 : 1,
          }}
          draggable={false}
        />

        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => switchTo(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className="rounded-full transition-all"
                style={{
                  width: i === selected ? '18px' : '6px',
                  height: '6px',
                  background: i === selected ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniaturas — mt-1 para menos espacio, sin outline azul */}
      {allImages.length > 1 && (
        <div
          className="flex gap-1.5 mt-1 overflow-x-auto pb-1"
          style={{ maxWidth: '900px', scrollbarWidth: 'none' }}
        >
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className="relative flex-shrink-0 overflow-hidden transition-opacity"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '2px',
                opacity: i === selected ? 1 : 0.4,
              }}
            >
              <img
                src={thumbUrls[i] ?? img}
                alt={`Miniatura ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

    </div>
  )
}