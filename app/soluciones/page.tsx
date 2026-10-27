import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import Cta from '@/components/Cta'
import { VisualAMedida, VisualAgentes, VisualConsultoria, VisualImplementacion } from '@/components/ServiceVisuals'
import { ArrowRight, Building, Doc, Settings, Shield } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Qué hacemos: soluciones de IA para tu operación',
  description: 'Soluciones a medida, agentes de IA, implementación y consultoría especializada. Integramos la inteligencia artificial con el trabajo de tu empresa.',
  path: '/soluciones',
})

const rows = [
  {
    n: '01',
    t: 'Soluciones a medida',
    d: 'Diseñamos y desarrollamos alrededor de tus procesos y objetivos. Partimos de cómo trabaja tu equipo y qué resultado necesita.',
    chips: ['Diseño funcional', 'Integración', 'Validación con casos reales'],
    href: '/soluciones/a-medida',
    cta: 'Conoce más',
    V: VisualAMedida,
  },
  {
    n: '02',
    t: 'Agentes de IA',
    d: 'Agentes que usan contexto autorizado y herramientas para participar en tareas, con revisión humana donde corresponde.',
    chips: ['Contexto autorizado', 'Herramientas', 'Supervisión'],
    href: '/soluciones/agentes-ia',
    cta: 'Cómo funcionan',
    V: VisualAgentes,
  },
  {
    n: '03',
    t: 'Implementación de IA',
    d: 'Integramos, validamos y acompañamos la adopción en el entorno donde ocurre el trabajo, con responsables y criterios definidos.',
    chips: ['Integración', 'Validación', 'Adopción', 'Operación'],
    href: '/soluciones/implementacion-ia',
    cta: 'Nuestro enfoque',
    V: VisualImplementacion,
  },
  {
    n: '04',
    t: 'Consultoría especializada',
    d: 'Identificamos oportunidades, evaluamos viabilidad y definimos una ruta para avanzar con claridad.',
    chips: ['Diagnóstico', 'Casos de uso', 'Piloto', 'Hoja de ruta'],
    href: '/soluciones/consultoria-ia',
    cta: 'Explorar consultoría',
    V: VisualConsultoria,
  },
]

const areas = [
  { Icon: Building, t: 'Comercial', d: 'Seguimiento de cuentas, preparación de reuniones, continuidad al transferir una cartera.' },
  { Icon: Doc, t: 'Conocimiento interno', d: 'Consulta de documentación, políticas y procedimientos con referencia a la fuente.' },
  { Icon: Settings, t: 'Operaciones', d: 'Coordinación de solicitudes, validaciones y excepciones entre personas y sistemas.' },
  { Icon: Shield, t: 'Gobierno de IA', d: 'Políticas, aprobaciones, registros y visibilidad del uso y del gasto en IA.' },
]

export default function Soluciones() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Qué hacemos' }]} />
          <div className="split">
            <div>
              <p className="eyebrow">Soluciones BRAIN</p>
              <h1>Soluciones de IA, diseñadas para tu operación.</h1>
              <p className="lead">Creamos soluciones a medida, agentes y productos propios. Integramos la inteligencia artificial con el trabajo de tu empresa.</p>
              <div className="page-hero__actions">
                <Link href="/contacto" className="btn btn--primary">
                  Cuéntanos tu proyecto <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="panel" aria-label="Esquema: conocimiento, agentes y herramientas, procesos">
              <div className="panel__head">
                Tres capas que conectamos <span className="badge badge--neutral">Esquema ilustrativo</span>
              </div>
              <div className="panel__body stack" style={{ gap: 10 }}>
                {[
                  ['Conocimiento', 'Tus datos, documentos y conocimiento del negocio.'],
                  ['Agentes y herramientas', 'Agentes, modelos y herramientas integradas, con permisos definidos.'],
                  ['Procesos', 'Tus procesos, sistemas y equipos de trabajo.'],
                ].map(([t, d], i) => (
                  <div key={t} className="card card--surface" style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12, alignItems: 'start' }}>
                    <span className="avatar" style={{ width: 28, height: 28 }}>
                      {i + 1}
                    </span>
                    <div>
                      <strong>{t}</strong>
                      <p className="small">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--border" style={{ paddingTop: 48 }}>
        <div className="container">
          {rows.map((r) => (
            <Reveal key={r.href} className="service-row">
              <span className="service-row__num">{r.n}</span>
              <h2 style={{ fontSize: '1.4rem' }}>{r.t}</h2>
              <div className="service-row__body">
                <p>{r.d}</p>
                <div className="chips">
                  {r.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
                <Link href={r.href} className="link" style={{ marginTop: 14 }}>
                  {r.cta} <ArrowRight />
                </Link>
              </div>
              <div className="service-row__visual">
                <r.V />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Ámbitos de aplicación</p>
            <h2>Dónde suele haber trabajo que hacer.</h2>
            <p className="lead">Son oportunidades habituales en las organizaciones, no casos de éxito. Cada proyecto se define a partir de su propio contexto.</p>
          </Reveal>
          <div className="grid grid-4">
            {areas.map((a) => (
              <Reveal key={a.t} className="card">
                <span className="icon-box">
                  <a.Icon />
                </span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Productos propios</p>
            <h2>Productos de IA para tu operación.</h2>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <Link href="/productos/lazo" className="card card--link" style={{ height: '100%' }}>
                <h3>LAZO</h3>
                <p>Relaciones comerciales con contexto y dirección. Agentes que entienden tus cuentas y preparan el siguiente movimiento.</p>
                <span className="link">
                  Explora LAZO <ArrowRight />
                </span>
              </Link>
            </Reveal>
            <Reveal>
              <Link href="/productos/nodra" className="card card--link" style={{ height: '100%' }}>
                <h3>Nodra</h3>
                <p>Gobierno y control de tu ecosistema de IA: políticas, aprobaciones, registros y visibilidad del gasto.</p>
                <span className="link">
                  Explora Nodra <ArrowRight />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <Cta title="¿Por dónde conviene empezar en tu caso?" text="Cuéntanos el proceso y el resultado que esperas. Te diremos si conviene una solución a medida, un piloto o una fase de consultoría." button="Hablemos" href="/contacto" />
    </>
  )
}
