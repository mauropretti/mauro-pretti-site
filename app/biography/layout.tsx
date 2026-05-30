import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Biografía',

  description:
    'Biografía de Mauro Pretti, fotógrafo y artista visual argentino. Desarrollo de proyectos autorales, fotografía artística, editorial y expositiva.',

  openGraph: {
    title: 'Biografía | Mauro Pretti',

    description:
      'Fotógrafo y artista visual argentino. Trayectoria, formación y práctica artística.',

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