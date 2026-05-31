
'use client'

import {useState} from 'react'

export default function ProductPurchase({
  price20x30,
  price30x45,
  price50x70,
}: {
  price20x30?: number
  price30x45?: number
  price50x70?: number
}) {

  const [size, setSize] = useState('20x30')

  const price =
    size === '20x30'
      ? price20x30
      : size === '30x45'
      ? price30x45
      : price50x70

  return (

    <div className="mt-12">

      <p
        className="
          text-[14px]

          uppercase

          tracking-[0.08em]

          text-black/50

          mb-6
        "
      >
        Tamaño
      </p>

      <div className="flex flex-col gap-3">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            name="size"
            value="20x30"
            checked={size === '20x30'}
            onChange={() => setSize('20x30')}
          />

          <span>20 × 30 cm</span>

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            name="size"
            value="30x45"
            checked={size === '30x45'}
            onChange={() => setSize('30x45')}
          />

          <span>30 × 45 cm</span>

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            name="size"
            value="50x70"
            checked={size === '50x70'}
            onChange={() => setSize('50x70')}
          />

          <span>50 × 70 cm</span>

        </label>

      </div>

      <div className="mt-8">

        <p
          className="
            text-[14px]

            uppercase

            tracking-[0.08em]

            text-black/50

            mb-2
          "
        >
          Precio
        </p>

        <p
          className="
            text-[28px]

            tracking-[-0.03em]
          "
        >
          ${price?.toLocaleString('es-AR')}
        </p>

      </div>

      <button
        className="
          mt-8

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
