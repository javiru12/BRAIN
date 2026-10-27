import type { Metadata } from 'next'
import { site } from '@/content/site'

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const fullTitle = opts.path === '/' ? site.title : `${opts.title} | BRAIN`
  const canonical = opts.path === '/' ? '/' : `${opts.path}/`
  return {
    title: fullTitle,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url: canonical,
      siteName: site.name,
      type: 'website',
      locale: 'es_MX',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BRAIN. Soluciones de IA para hacer avanzar tu empresa.' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: opts.description,
      images: ['/og.png'],
    },
  }
}
