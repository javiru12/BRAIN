import type { Metadata } from 'next'
import { site } from '@/content/site'

export function pageMeta(opts: { title: string; description: string; path: string }): Metadata {
  const fullTitle = opts.path === '/' ? site.title : `${opts.title} | BRAIN`
  return {
    title: fullTitle,
    description: opts.description,
    openGraph: {
      title: fullTitle,
      description: opts.description,
      siteName: site.name,
      type: 'website',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description: opts.description,
    },
  }
}
