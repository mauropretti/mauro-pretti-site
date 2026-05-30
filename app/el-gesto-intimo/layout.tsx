import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'El Gesto Íntimo | Mauro Pretti',
  description:
    'Proyecto fotográfico y pieza expositiva de Mauro Pretti. Narrativa visual sobre intimidad, contemplación y deseo.',

  openGraph: {
    title: 'El Gesto Íntimo | Mauro Pretti',
    description:
      'Proyecto fotográfico y pieza expositiva de Mauro Pretti. Narrativa visual sobre intimidad, contemplación y deseo.',
    type: 'website',
  },
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}