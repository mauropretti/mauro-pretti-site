import type {Metadata} from 'next'

import './globals.css'

import {Bebas_Neue} from 'next/font/google'
import Script from 'next/script'

import SmoothScroll from './components/SmoothScroll'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mauropretti.com'),

  title: {
    default: 'Mauro Pretti | Fotógrafo y Artista Visual',
    template: '%s | Mauro Pretti',
  },

  description:
    'Fotógrafo y artista visual argentino. Proyectos autorales, fotografía artística, publicitaria, teatro y piezas expositivas.',

  keywords: [
    'Mauro Pretti',
    'Fotógrafo',
    'Fotografía artística',
    'Fotografía publicitaria',
    'Fotógrafo Buenos Aires',
    'Artista visual',
    'Teatro',
    'Lightroom',
  ],

  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://mauropretti.com',
    siteName: 'Mauro Pretti',

    title: 'Mauro Pretti | Fotógrafo y Artista Visual',

    description:
      'Fotografía artística, publicitaria y proyectos autorales.',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Mauro Pretti | Fotógrafo y Artista Visual',

    description:
      'Fotografía artística, publicitaria y proyectos autorales.',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html lang="es">

      <body>

        <Script id="ig-webview-detect" strategy="afterInteractive">{`
          if (/Instagram/.test(navigator.userAgent)) {
            document.documentElement.classList.add('ig-webview')
          }
        `}</Script>

        <div className="site-shell">

          <SmoothScroll />

          {children}

        </div>

      </body>

    </html>

  )
}