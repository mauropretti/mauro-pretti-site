import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Curso Lightroom CC',

  description:
    'Curso de Lightroom CC orientado a fotógrafos, creativos y profesionales. Flujo de trabajo, revelado, color, exportación y optimización de portfolios.',

  openGraph: {
    title: 'Curso Lightroom CC | Mauro Pretti',

    description:
      'Curso de Lightroom CC para fotógrafos y profesionales.',

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