import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Publicitaria',

  description:
    'Campañas, editoriales y producciones visuales de Mauro Pretti. Fotografía publicitaria, dirección estética y construcción de imagen.',

  openGraph: {
    title: 'Publicitaria | Mauro Pretti',

    description:
      'Campañas, editoriales y producciones visuales.',

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