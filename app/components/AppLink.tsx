'use client'

import Link from 'next/link'

export default function AppLink({
  href,
  children,
  className = '',
}: any) {

  const handleClick = () => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

  }

  return (

    <Link
      href={href}
      scroll={true}
      onClick={handleClick}
      className={className}
    >

      {children}

    </Link>

  )

}