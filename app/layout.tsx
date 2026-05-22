import type {Metadata} from 'next'

import './globals.css'

import { Bebas_Neue } from 'next/font/google'

import SmoothScroll from './components/SmoothScroll'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Mauro Pretti',
  description: 'Photographer Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html lang="en">

      <body>

        <div className="site-shell">

          <SmoothScroll />

          {children}

        </div>

      </body>

    </html>

  )
}