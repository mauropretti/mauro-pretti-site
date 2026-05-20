import type {Metadata} from 'next'
import './globals.css'

import SmoothScroll from './components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Mauro Pretti',
  description: 'Photographer Portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (

    <html lang="en">

      <body>

        <div className="site-shell">

          <SmoothScroll />

          {children}

        </div>

      </body>

    </html>

  )
}