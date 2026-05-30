'use client'

import Link from 'next/link'

import ParallaxImage from './ParallaxImage'

import {urlFor} from '@/sanity/image'

export default function ProjectLink({
  item,
  index,
}: any) {

  return (

    <Link
      href={`/projects/${item.slug}`}
      scroll={true}

      className={`
        group
        block

        mb-20
        md:mb-28

        ${
          index % 4 === 0
            ? 'self-start ml-[8vw]'
            : index % 4 === 1
            ? 'self-end mr-[10vw]'
            : index % 4 === 2
            ? 'self-center'
            : 'self-start ml-[18vw]'
        }
      `}
    >

      <div
        className={`
          overflow-visible
          bg-[#ecece8]

          ${
            index % 4 === 0
              ? 'w-[72vw] sm:w-[58vw] md:w-[28vw] lg:w-[32vw]'
              : index % 4 === 1
              ? 'w-[58vw] sm:w-[46vw] md:w-[22vw] lg:w-[26vw]'
              : index % 4 === 2
              ? 'w-[84vw] sm:w-[72vw] md:w-[36vw] lg:w-[40vw]'
              : 'w-[64vw] sm:w-[52vw] md:w-[24vw] lg:w-[28vw]'
          }
        `}
      >

        <ParallaxImage
          src={urlFor(item.image)
            .width(1600)
            .quality(82)
            .url()}
alt={`${item.title} – proyecto fotográfico de Mauro Pretti`}        />

      </div>

    </Link>

  )
}