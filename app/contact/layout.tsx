import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacto con Mauro Pretti. Consultas sobre proyectos fotográficos, fotografía publicitaria, ediciones Fine Art y colaboraciones desde Buenos Aires.',
  alternates: {
    canonical: 'https://mauropretti.com/contact',
  },
  openGraph: {
    title: 'Contacto | Mauro Pretti',
    description:
      'Contacto con Mauro Pretti. Consultas sobre proyectos fotográficos, fotografía publicitaria, ediciones Fine Art y colaboraciones desde Buenos Aires.',
    type: 'website',
    url: 'https://mauropretti.com/contact',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Contacto – Mauro Pretti, Fotógrafo Buenos Aires',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Mauro Pretti',
    description:
      'Contacto con Mauro Pretti. Consultas sobre proyectos fotográficos, fotografía publicitaria, ediciones Fine Art y colaboraciones desde Buenos Aires.',
    images: ['/og-image.webp'],
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}