import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { site } from '@/content/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-heading', display: 'swap', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: { icon: '/brand/brain-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a href="#main" className="sr-only">
          Ir al contenido
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
