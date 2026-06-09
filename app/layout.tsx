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
    default: 'Mauro Pretti — Fotógrafo Buenos Aires | Fotografía Artística y Publicitaria',
    template: '%s | Mauro Pretti',
  },

  description:
    'Mauro Pretti, fotógrafo y artista visual en Buenos Aires. Fotografía artística, publicitaria, teatro y proyectos autorales. Explorá su obra.',

  keywords: [
    'Mauro Pretti',
    'Fotógrafo Buenos Aires',
    'Fotografía artística Buenos Aires',
    'Fotografía publicitaria',
    'Artista visual Argentina',
    'Fotógrafo publicitario',
    'Teatro fotografía',
    'Curso Lightroom',
  ],

  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://mauropretti.com',
    siteName: 'Mauro Pretti',
    title: 'Mauro Pretti — Fotógrafo Buenos Aires | Fotografía Artística y Publicitaria',
    description: 'Fotografía artística, publicitaria y proyectos autorales desde Buenos Aires.',
    images: [
  {
    url: '/og-image.webp',
    width: 1200,
    height: 630,
    alt: 'Mauro Pretti – Fotógrafo y Artista Visual, Buenos Aires',
  },
],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mauro Pretti — Fotógrafo Buenos Aires | Fotografía Artística y Publicitaria',
    description: 'Fotografía artística, publicitaria y proyectos autorales desde Buenos Aires.',
images: ['/og-image.webp'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD Schema.org Person
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mauro Pretti',
  jobTitle: 'Fotógrafo y Artista Visual',
  url: 'https://mauropretti.com',
image: 'https://mauropretti.com/og-image.webp',
  birthPlace: {
    '@type': 'Place',
    name: 'Paraná, Entre Ríos, Argentina',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Buenos Aires',
    addressCountry: 'AR',
  },
  sameAs: [
    // Agregá tus redes reales acá:
    // 'https://www.instagram.com/mauropretti',
    // 'https://www.linkedin.com/in/mauropretti',
  ],
  knowsAbout: [
    'Fotografía artística',
    'Fotografía publicitaria',
    'Fotografía de teatro',
    'Arte contemporáneo',
    'Edición fotográfica',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>

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