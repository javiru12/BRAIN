import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import { site, services } from '@/content/site'
import HeroMotion from '@/components/home/HeroMotion'
import ScrollBrain from '@/components/home/ScrollBrain'
import NeedsSelector from '@/components/home/NeedsSelector'
import Reveal from '@/components/Reveal'
import Cta from '@/components/Cta'
import { ArrowRight, Bot, Compass, Plug, Target, Users, Map, Shield, Eye, Layers } from '@/components/Icons'

export const metadata = pageMeta({ title: site.title, description: site.description, path: '/' })

const icons = { target: Target, bot: Bot, plug: Plug, compass: Compass } as const

export default function Home() {
  return (
    <>
      <ScrollBrain />

      <div className="strip">
        <div className="container strip__inner">
          <div className="strip__item">
            <Target />
            <div>
              <strong>Soluciones a medida</strong>
              <span>Alrededor de tu proceso y tus objetivos.</span>
            </div>
          </div>
          <div className="strip__item">
            <Plug />
            <div>
              <strong>Implementación de IA</strong>
              <span>Integración, validación y adopción.</span>
            </div>
          </div>
          <div className="strip__item">
            <Layers />
            <div>
              <strong>Productos propios</strong>
              <span>LAZO y Nodra.</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section section--surface" id="proyecto">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Un proyecto, en movimiento</p>
            <h2>Del contexto a una decisión revisada.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Una solución de IA reúne el contexto autorizado, prepara una propuesta y la deja lista para que una persona la revise antes de actuar. Así se ve, de forma ilustrativa.
            </p>
            <Link href="/soluciones/agentes-ia" className="link" style={{ marginTop: 20 }}>
              Cómo funcionan los agentes <ArrowRight />
            </Link>
          </Reveal>
          <Reveal>
            <HeroMotion />
          </Reveal>
        </div>
      </section>

      <section className="section" id="que-hacemos">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Qué hacemos</p>
            <h2>Diseñamos la solución alrededor de tu operación.</h2>
            <p className="lead">
              Cada organización tiene procesos, sistemas y objetivos diferentes. En BRAIN conectamos esas necesidades con soluciones de IA que puedan utilizarse dentro del trabajo.
            </p>
          </Reveal>
          <div className="grid grid-4">
            {services.map((s) => {
              const Icon = icons[s.icon as keyof typeof icons]
              return (
                <Reveal key={s.href}>
                  <Link href={s.href} className="card card--link" style={{ height: '100%' }}>
                    <span className="icon-box">
                      <Icon />
                    </span>
                    <h3>{s.label}</h3>
                    <p>{s.desc}</p>
                    <span className="link">
                      Ver más <ArrowRight />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--surface" id="productos">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Productos propios</p>
            <h2>Dos productos. Retos concretos.</h2>
            <p className="lead">Aplicamos nuestra visión de la IA a las relaciones comerciales y al gobierno de la tecnología dentro de las organizaciones.</p>
          </Reveal>
          <div className="grid grid-2">
            <Reveal>
              <article className="card" style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 20, alignItems: 'center' }}>
                <div>
                  <h3 className="display" style={{ fontSize: '1.7rem' }}>
                    LAZO
                  </h3>
                  <p style={{ fontWeight: 500, color: 'var(--text)' }}>Relaciones comerciales con contexto y dirección.</p>
                  <p className="small" style={{ marginTop: 6 }}>
                    Agentes que ayudan a entender cada cuenta y a preparar el siguiente movimiento.
                  </p>
                  <Link href="/productos/lazo" className="link" style={{ marginTop: 16 }}>
                    Conocer LAZO <ArrowRight />
                  </Link>
                </div>
                <div className="panel" aria-hidden="true">
                  <div className="panel__head" style={{ fontSize: '0.8rem' }}>
                    Mapa de cuenta <span className="badge badge--neutral">Ilustrativo</span>
                  </div>
                  <div className="panel__body" style={{ padding: 12 }}>
                    <svg viewBox="0 0 220 120" style={{ width: '100%', height: 'auto' }}>
                      <g stroke="#cbd5e1" strokeWidth="1">
                        <line x1="110" y1="60" x2="40" y2="25" />
                        <line x1="110" y1="60" x2="180" y2="30" />
                        <line x1="110" y1="60" x2="50" y2="95" />
                        <line x1="110" y1="60" x2="175" y2="95" />
                        <line x1="40" y1="25" x2="180" y2="30" strokeDasharray="3 3" />
                      </g>
                      {[
                        [40, 25],
                        [180, 30],
                        [50, 95],
                        [175, 95],
                      ].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="9" fill="#fff" stroke="#426B83" strokeWidth="1.5" />
                      ))}
                      <circle cx="110" cy="60" r="13" fill="#426B83" />
                      <text x="110" y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
                        Cuenta
                      </text>
                    </svg>
                  </div>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="card" style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 20, alignItems: 'center' }}>
                <div>
                  <h3 className="display" style={{ fontSize: '1.7rem' }}>
                    Nodra
                  </h3>
                  <p style={{ fontWeight: 500, color: 'var(--text)' }}>Visibilidad y control de tu ecosistema de IA.</p>
                  <p className="small" style={{ marginTop: 6 }}>
                    Políticas, aprobaciones y registros para agentes, modelos, herramientas y flujos.
                  </p>
                  <Link href="/productos/nodra" className="link" style={{ marginTop: 16 }}>
                    Conocer Nodra <ArrowRight />
                  </Link>
                </div>
                <div className="panel" aria-hidden="true">
                  <div className="panel__head" style={{ fontSize: '0.8rem' }}>
                    Gobierno de IA <span className="badge badge--neutral">Ilustrativo</span>
                  </div>
                  <div className="panel__body" style={{ padding: 10 }}>
                    <div className="list-rows" style={{ fontSize: '0.75rem' }}>
                      <div style={{ padding: '6px 8px' }}>
                        <Bot /> Asistente comercial <span className="badge badge--ok" style={{ marginLeft: 'auto' }}>Activo</span>
                      </div>
                      <div style={{ padding: '6px 8px' }}>
                        <Eye /> Análisis de documentos <span className="badge badge--ok" style={{ marginLeft: 'auto' }}>Activo</span>
                      </div>
                      <div style={{ padding: '6px 8px' }}>
                        <Shield /> Generación de informes <span className="badge badge--warn" style={{ marginLeft: 'auto' }}>Revisión</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="necesidades">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Por dónde empezar</p>
            <h2>¿Qué quieres mejorar en tu organización?</h2>
            <p className="lead">Elige una necesidad para ver qué oportunidad suele haber detrás y por dónde conviene entrar.</p>
          </Reveal>
          <Reveal>
            <NeedsSelector />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="como-trabajamos">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2>Del contexto a la implementación.</h2>
          </Reveal>
          <Reveal>
            <ol className="steps">
              {[
                ['Entendemos el proceso', 'Qué ocurre hoy, quién participa, qué sistemas intervienen y qué resultado se espera.'],
                ['Diseñamos la solución', 'Alcance, fuentes de contexto, herramientas, permisos y puntos de revisión.'],
                ['Construimos y validamos', 'Desarrollo iterativo con casos reales y criterios de evaluación acordados.'],
                ['Implementamos y acompañamos', 'Integración en el entorno de trabajo, adopción por el equipo y seguimiento.'],
              ].map(([t, d], i) => (
                <li className="step" key={t}>
                  <span className="step__num">{i + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section" id="quienes-somos">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Quiénes somos</p>
            <h2>Somos BRAIN. Creamos soluciones de inteligencia artificial.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Combinamos desarrollo, conocimiento del negocio y productos propios para ayudar a las organizaciones a transformar cómo se realiza el trabajo.
            </p>
            <Link href="/empresa" className="btn btn--secondary" style={{ marginTop: 24 }}>
              Conoce BRAIN <ArrowRight />
            </Link>
          </Reveal>
          <Reveal>
            <div className="grid grid-3" style={{ gap: 12 }}>
              {[
                [Map, 'Negocio', 'Contexto y objetivos'],
                [Bot, 'Tecnología', 'Agentes y productos'],
                [Users, 'Personas', 'Conocimiento y trabajo'],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Map
                return (
                  <div className="card card--surface" key={t as string} style={{ padding: 20, textAlign: 'center' }}>
                    <span className="icon-box" style={{ margin: '0 auto 12px' }}>
                      <I />
                    </span>
                    <strong>{t as string}</strong>
                    <p className="small">{d as string}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <Cta
        title="¿Qué debería estar haciendo la IA por tu empresa?"
        text="Cuéntanos qué proceso quieres mejorar, qué está frenando a tu equipo o qué necesitas controlar."
        button="Hablemos de tu proyecto"
        href="/contacto"
      />
    </>
  )
}
