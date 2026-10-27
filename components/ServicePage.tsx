import Link from 'next/link'
import type { ReactNode } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Reveal from './Reveal'
import Cta from './Cta'
import { ArrowRight } from './Icons'
import { services } from '@/content/site'

/** Plantilla común de páginas de servicio. El contenido específico se pasa como props. */
export default function ServicePage({
  slug,
  eyebrow,
  h1,
  lead,
  visual,
  children,
  cta,
}: {
  slug: string
  eyebrow: string
  h1: string
  lead: string
  visual: ReactNode
  children: ReactNode
  cta: { label: string; interest: string }
}) {
  const current = services.find((s) => s.slug === slug)!
  const others = services.filter((s) => s.slug !== slug)
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: '/soluciones', label: 'Qué hacemos' }, { label: current.label }]} />
          <div className="split">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{h1}</h1>
              <p className="lead">{lead}</p>
              <div className="page-hero__actions">
                <Link href={`/contacto?interes=${cta.interest}`} className="btn btn--primary">
                  {cta.label} <ArrowRight />
                </Link>
                <Link href="/soluciones" className="btn btn--secondary">
                  Todas las soluciones
                </Link>
              </div>
            </div>
            <div>{visual}</div>
          </div>
        </div>
      </section>

      {children}

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Otros servicios</p>
            <h2>También puede interesarte.</h2>
          </Reveal>
          <div className="grid grid-3">
            {others.map((s) => (
              <Reveal key={s.href}>
                <Link href={s.href} className="card card--link" style={{ height: '100%' }}>
                  <h3>{s.label}</h3>
                  <p>{s.desc}</p>
                  <span className="link">
                    Ver más <ArrowRight />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Cta title={cta.label} text="Cuéntanos el contexto y el resultado que esperas. Definimos juntos el alcance." button="Hablemos" href={`/contacto?interes=${cta.interest}`} />
    </>
  )
}
