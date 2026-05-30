import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Contacto',

  description:
    'Contacto profesional de Mauro Pretti. Fotografía artística, publicitaria, teatro, proyectos editoriales y colaboraciones.',

  openGraph: {
    title: 'Contacto | Mauro Pretti',

    description:
      'Información de contacto y consultas profesionales.',

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