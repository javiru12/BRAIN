import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export const dynamic = 'force-static'

const routes = ['/', '/soluciones/', '/soluciones/a-medida/', '/soluciones/agentes-ia/', '/soluciones/implementacion-ia/', '/soluciones/consultoria-ia/', '/empresa/', '/productos/', '/productos/lazo/', '/productos/nodra/', '/contacto/']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: 'monthly',
    priority: r === '/' ? 1 : r.startsWith('/productos/') && r !== '/productos/' ? 0.9 : 0.7,
  }))
}
