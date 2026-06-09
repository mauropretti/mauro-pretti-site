export const dynamic = 'force-dynamic'

import type {Metadata} from 'next'

import Header from '../components/Header'
import AppLink from '../components/AppLink'

export const metadata: Metadata = {
  title: 'Curso Lightroom',
  description:
    'Curso online de Lightroom orientado a fotógrafos y creativos. Desarrollá un flujo de trabajo eficiente con Mauro Pretti, fotógrafo y artista visual en Buenos Aires.',
  alternates: {
    canonical: 'https://mauropretti.com/lightroom',
  },
  openGraph: {
    title: 'Curso Lightroom | Mauro Pretti',
    description:
      'Curso online de Lightroom orientado a fotógrafos y creativos. Desarrollá un flujo de trabajo eficiente con Mauro Pretti, fotógrafo y artista visual en Buenos Aires.',
    url: 'https://mauropretti.com/lightroom',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Curso Lightroom con Mauro Pretti',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curso Lightroom | Mauro Pretti',
    description:
      'Curso online de Lightroom orientado a fotógrafos y creativos. Desarrollá un flujo de trabajo eficiente con Mauro Pretti, fotógrafo y artista visual en Buenos Aires.',
    images: ['/og-image.webp'],
  },
}

export default async function LightroomPage() {
  return (
    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">
      <Header />

      {/* CONTENT */}
      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">
        <div className="max-w-[980px]">

          {/* LABEL */}
          <p
            className="
              text-[12px] md:text-[13px]
              lowercase
              tracking-[-0.01em]
              text-[#4940d8]/70
              mb-6
            "
            style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
          >
            curso online a distancia con clases en vivo
          </p>

          {/* TITLE */}
          <h1
            className="
              text-[30px] sm:text-[38px] md:text-[54px] lg:text-[64px]
              leading-[0.92]
              tracking-[-0.06em]
              font-light
              text-[#4940d8]
              mb-10
            "
            style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
          >
            Curso Lightroom
          </h1>

          {/* DESCRIPTION */}
          <div
            className="
              max-w-[760px]
              text-[15px] md:text-[17px]
              leading-[1.8]
              text-black/60
              space-y-8
            "
            style={{fontFamily: 'Inter, Helvetica, Arial, sans-serif'}}
          >
            <p>
              Curso orientado a fotógrafos, creativos y profesionales que buscan
              desarrollar un flujo de trabajo eficiente y creativo desde Lightroom.
            </p>

            <p>Próximamente disponible.</p>
          </div>

        </div>
      </section>

      <footer className="px-6 md:px-10 pb-16">
        <div
          className="
            flex flex-wrap
            gap-x-4 gap-y-3
            text-[13px] sm:text-[14px]
            tracking-[-0.03em]
            text-black/55
          "
          style={{fontFamily: 'Satoshi, Inter, sans-serif'}}
        >
          <AppLink href="/">Home</AppLink>
          <AppLink href="/publicitaria">Publicitaria</AppLink>
          <AppLink href="/teatro">Teatro</AppLink>
          <AppLink href="/el-gesto-intimo">El gesto íntimo</AppLink>
          <AppLink href="/tienda">Tienda</AppLink>
        </div>
      </footer>
    </main>
  )
}