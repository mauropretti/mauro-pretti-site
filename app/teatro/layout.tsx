import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Teatro',

  description:
    'Registro fotográfico escénico de Mauro Pretti. Fotografía teatral centrada en el cuerpo, la presencia, la iluminación y el espacio escénico.',

  openGraph: {
    title: 'Teatro | Mauro Pretti',

    description:
      'Archivo fotográfico escénico y teatral.',

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