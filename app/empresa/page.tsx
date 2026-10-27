import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import Cta from '@/components/Cta'
import { ArrowRight, Bot, Building, Chart, Doc, Eye, Lightbulb, Lock, Map, Shield, Target, Users } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Quiénes somos',
  description: 'BRAIN crea soluciones de inteligencia artificial. Combinamos agentes, tecnología propia y conocimiento del negocio para transformar cómo se realiza el trabajo.',
  path: '/empresa',
})

const principles = [
  { Icon: Lightbulb, t: 'Utilidad', d: 'Partimos de problemas concretos y del trabajo que necesita avanzar.' },
  { Icon: Map, t: 'Contexto', d: 'Entendemos la operación antes de proponer cómo cambiarla.' },
  { Icon: Shield, t: 'Responsabilidad', d: 'Definimos límites, permisos y puntos de revisión.' },
  { Icon: Doc, t: 'Claridad', d: 'Explicamos el alcance, las dependencias y los límites de la solución.' },
  { Icon: Chart, t: 'Evidencia', d: 'Evaluamos el comportamiento y los resultados para orientar mejoras.' },
  { Icon: Lock, t: 'Respeto por la información', d: 'Consideramos acceso, uso y protección desde el diseño.' },
]

export default function Empresa() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Quiénes somos' }]} />
          <p className="eyebrow">Conoce BRAIN</p>
          <h1 style={{ maxWidth: 820 }}>Somos BRAIN. Creamos soluciones de inteligencia artificial.</h1>
          <p className="lead" style={{ maxWidth: 760 }}>
            Diseñamos, desarrollamos e implementamos soluciones de IA para las organizaciones. Combinamos agentes, tecnología propia y conocimiento del negocio para transformar cómo se realiza el trabajo.
          </p>
        </div>
      </section>

      <div className="strip">
        <div className="container strip__inner">
          <div className="strip__item">
            <Target />
            <div>
              <strong>Soluciones a medida</strong>
              <span>Para contextos y objetivos reales.</span>
            </div>
          </div>
          <div className="strip__item">
            <Bot />
            <div>
              <strong>Agentes e implementación</strong>
              <span>De la validación al uso diario.</span>
            </div>
          </div>
          <div className="strip__item">
            <Chart />
            <div>
              <strong>Productos propios</strong>
              <span>LAZO y Nodra.</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section section--surface" id="proposito">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Nuestro propósito</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 1.3rem + 1.8vw, 2.6rem)' }}>Convertir el conocimiento de las organizaciones en capacidad para actuar.</h2>
          </Reveal>
          <Reveal>
            <div className="mini" style={{ padding: 28, gap: 0, background: '#fff' }} aria-label="Negocio, tecnología y personas">
              {[
                [Building, 'Negocio', 'Contexto y objetivos'],
                [Bot, 'Tecnología', 'Soluciones de IA'],
                [Users, 'Personas', 'Conocimiento y trabajo'],
              ].map(([Icon, t, d], i) => {
                const I = Icon as typeof Building
                return (
                  <span key={t as string} style={{ display: 'contents' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <span className="icon-box" style={{ margin: '0 auto 10px', width: 56, height: 56, borderRadius: '50%' }}>
                        <I />
                      </span>
                      <strong style={{ display: 'block', fontSize: '0.95rem' }}>{t as string}</strong>
                      <span className="small muted">{d as string}</span>
                    </div>
                    {i < 2 && <i className="mini__arrow" />}
                  </span>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <Reveal className="card">
            <span className="icon-box">
              <Target />
            </span>
            <h2 style={{ fontSize: '1.4rem' }}>Nuestra misión</h2>
            <p style={{ marginTop: 8 }}>Diseñar e implementar soluciones de inteligencia artificial que conecten conocimiento, personas y procesos con objetivos claros, supervisión y aprendizaje continuo.</p>
          </Reveal>
          <Reveal className="card">
            <span className="icon-box">
              <Eye />
            </span>
            <h2 style={{ fontSize: '1.4rem' }}>Nuestra visión</h2>
            <p style={{ marginTop: 8 }}>Construir un futuro en el que personas y agentes de IA colaboren con claridad, responsabilidad y capacidad de adaptación.</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="principios">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Los principios detrás de nuestro trabajo</p>
            <h2>Principios que guían lo que hacemos.</h2>
          </Reveal>
          <Reveal>
            <div className="principles">
              {principles.map((p) => (
                <div className="principle" key={p.t}>
                  <p.Icon />
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Qué nos distingue</p>
            <h2>Estrategia, construcción y producto en una misma conversación.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Entendemos el negocio para saber qué merece la pena resolver, tenemos capacidad de desarrollo para construirlo y mantenemos productos propios que nos obligan a resolver problemas de verdad: permisos, integraciones, supervisión, adopción. Esa combinación evita que la estrategia se quede en un documento o que la tecnología se construya sin un problema detrás.
            </p>
            <Link href="/soluciones" className="link" style={{ marginTop: 20 }}>
              Conoce nuestras soluciones <ArrowRight />
            </Link>
          </Reveal>
          <Reveal>
            <div className="stack">
              {[
                ['Comprensión del negocio', 'Procesos, objetivos y restricciones reales de cada organización.'],
                ['Capacidad de desarrollo', 'Diseño, construcción, integración y validación de soluciones.'],
                ['Productos propios', 'LAZO y Nodra, aplicados a retos concretos y en evolución continua.'],
              ].map(([t, d], i) => (
                <div className="card card--surface" key={t} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 14, padding: 18 }}>
                  <span className="avatar">{i + 1}</span>
                  <div>
                    <strong>{t}</strong>
                    <p className="small">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Cta title="¿Hablamos de tu organización?" text="Cuéntanos qué quieres mejorar y vemos juntos por dónde empezar." button="Hablemos" href="/contacto" />
    </>
  )
}
