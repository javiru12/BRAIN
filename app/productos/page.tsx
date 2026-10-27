import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import { products } from '@/content/site'
import { ArrowRight } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Productos: LAZO y Nodra',
  description: 'Productos propios de BRAIN: LAZO, relaciones comerciales con contexto y dirección, y Nodra, gobierno y control del ecosistema de IA.',
  path: '/productos',
})

export default function Productos() {
  return (
    <section className="page-hero" style={{ paddingBottom: 80 }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Productos' }]} />
        <p className="eyebrow">Productos propios</p>
        <h1>Dos productos. Retos concretos.</h1>
        <p className="lead">Aplicamos nuestra visión de la IA a las relaciones comerciales y al gobierno de la tecnología dentro de las organizaciones.</p>
        <div className="grid grid-2" style={{ marginTop: 40 }}>
          {products.map((p) => (
            <Link key={p.href} href={p.href} className="card card--link">
              <h2 style={{ fontSize: '1.6rem' }}>{p.label}</h2>
              <p>{p.desc}</p>
              <span className="link">
                Conocer {p.label} <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
