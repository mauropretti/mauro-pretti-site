import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'El Gesto Íntimo',
  description:
    'Proyecto fotográfico y pieza expositiva de Mauro Pretti. Narrativa visual sobre intimidad, contemplación y deseo desde Buenos Aires.',
  alternates: {
    canonical: 'https://mauropretti.com/el-gesto-intimo',
  },
  openGraph: {
    title: 'El Gesto Íntimo | Mauro Pretti',
    description:
      'Proyecto fotográfico y pieza expositiva de Mauro Pretti. Narrativa visual sobre intimidad, contemplación y deseo desde Buenos Aires.',
    type: 'website',
    url: 'https://mauropretti.com/el-gesto-intimo',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'El Gesto Íntimo – Mauro Pretti',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Gesto Íntimo | Mauro Pretti',
    description:
      'Proyecto fotográfico y pieza expositiva de Mauro Pretti. Narrativa visual sobre intimidad, contemplación y deseo desde Buenos Aires.',
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