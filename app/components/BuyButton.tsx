'use client'

import {useState} from 'react'

export default function BuyButton({
  title,
  price20x30,
  price30x45,
  price50x70,
}: {
  title: string
  price20x30: number
  price30x45: number
  price50x70: number
}) {

  const [size, setSize] = useState('20x30')

  const price =
    size === '20x30'
      ? price20x30
      : size === '30x45'
      ? price30x45
      : price50x70

  async function handleBuy() {

    const res = await fetch('/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `${title} (${size})`,
        price,
      }),
    })

    const data = await res.json()

    if (data.init_point) {
      window.location.href = data.init_point
    }

  }

  return (

    <div className="mt-10">

      <p className="text-[13px] uppercase text-black/50 mb-4">
        Tamaño
      </p>

      <div className="flex flex-col gap-3 mb-8">

        <label>
          <input
            type="radio"
            checked={size === '20x30'}
            onChange={() => setSize('20x30')}
          />
          <span className="ml-3">
            20 × 30 cm
          </span>
        </label>

        <label>
          <input
            type="radio"
            checked={size === '30x45'}
            onChange={() => setSize('30x45')}
          />
          <span className="ml-3">
            30 × 45 cm
          </span>
        </label>

        <label>
          <input
            type="radio"
            checked={size === '50x70'}
            onChange={() => setSize('50x70')}
          />
          <span className="ml-3">
            50 × 70 cm
          </span>
        </label>

      </div>

      <p className="text-[13px] uppercase text-black/50 mb-2">
        Precio
      </p>

      <p className="text-[28px] tracking-[-0.04em] mb-8">
        ${price.toLocaleString('es-AR')}
      </p>

      <button
        onClick={handleBuy}
        className="
          border
          border-black/20

          px-6
          py-3

          text-[14px]

          hover:border-black

          transition
        "
      >
        Comprar
      </button>

    </div>

  )

}
