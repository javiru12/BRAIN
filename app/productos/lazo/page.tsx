import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductSubnav from '@/components/ProductSubnav'
import Reveal from '@/components/Reveal'
import Accordion from '@/components/Accordion'
import Cta from '@/components/Cta'
import LazoDemo from '@/components/lazo/LazoDemo'
import { ArrowRight, Calendar, Chat, Check, Clock, Doc, Eye, Map, Route, Signal, Sliders, Target, Users } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'LAZO: relaciones comerciales con contexto y dirección',
  description: 'LAZO utiliza agentes para entender tus cuentas, conservar la memoria comercial y preparar el siguiente movimiento. Agentic Relationship Management.',
  path: '/productos/lazo',
})

const sections = [
  { id: 'que-es', label: 'Qué es' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'capacidades', label: 'Capacidades' },
  { id: 'demo', label: 'Demo' },
  { id: 'integraciones', label: 'Migración e integraciones' },
  { id: 'control', label: 'Control' },
  { id: 'preguntas', label: 'Preguntas' },
]

const pillars = [
  { Icon: Users, t: 'Relaciones', d: 'Personas, roles y vínculos dentro de cada cuenta.' },
  { Icon: Doc, t: 'Memoria', d: 'Conversaciones, compromisos y acuerdos, conservados y ordenados.' },
  { Icon: Signal, t: 'Señales', d: 'Cambios de actividad, silencios y oportunidades que conviene atender.' },
  { Icon: Target, t: 'Objetivos', d: 'Qué se quiere conseguir con cada cuenta y en qué plazo.' },
  { Icon: Route, t: 'Movimientos', d: 'El siguiente paso concreto, con su justificación.' },
]

const steps = [
  ['Reúne contexto', 'Conversaciones, notas, contactos y actividad de la cuenta.'],
  ['Entiende la cuenta', 'Quién decide, quién influye y qué relación existe con cada persona.'],
  ['Identifica información pendiente', 'Lo que falta para avanzar y lo que nadie ha confirmado.'],
  ['Prepara un plan', 'Pasos ordenados hacia el objetivo comercial definido.'],
  ['Propone un movimiento', 'Una acción concreta, con motivo visible, para que la persona decida.'],
  ['Conserva continuidad', 'La memoria de la cuenta sigue disponible aunque cambie el responsable.'],
]

const capabilities = [
  { Icon: Target, t: 'Objetivos comerciales', d: 'Cada cuenta trabaja hacia un objetivo explícito: renovar, ampliar, reactivar, abrir. El objetivo orienta el resto.' },
  { Icon: Map, t: 'Mapa de relaciones', d: 'Quién es quién dentro de la cuenta y cómo se relacionan entre sí y con tu equipo.' },
  { Icon: Users, t: 'Identificación de personas relevantes', d: 'Qué personas importan para el objetivo actual y con cuáles no existe todavía relación.' },
  { Icon: Route, t: 'Rutas de introducción', d: 'A través de quién puede llegarse a una persona con la que no hay contacto directo.' },
  { Icon: Signal, t: 'Señales de interacción', d: 'Cambios de ritmo, silencios prolongados y compromisos sin cerrar.' },
  { Icon: Doc, t: 'Memoria de conversaciones y compromisos', d: 'Historial ordenado y consultable de lo hablado y lo acordado.' },
  { Icon: Calendar, t: 'Preparación de siguientes pasos', d: 'Borradores de mensajes, guiones de reunión y material de apoyo listos para revisar.' },
  { Icon: Clock, t: 'Continuidad al transferir una cartera', d: 'Quien recibe una cuenta encuentra su contexto completo, no una lista de contactos.' },
  { Icon: Eye, t: 'Consulta del contexto de una cuenta', d: 'Preguntar a la cuenta: qué se acordó, qué está pendiente, quién decide.' },
  { Icon: Sliders, t: 'Configuración de autonomía', d: 'Qué hace LAZO por su cuenta y qué deja preparado para aprobación, tarea por tarea.' },
]

const faq = [
  {
    q: '¿Qué significa Agentic Relationship Management?',
    a: 'Es una forma de gestionar relaciones comerciales en la que agentes de IA participan en el trabajo: reúnen contexto, conservan la memoria de la cuenta y preparan el siguiente movimiento. A diferencia de un CRM tradicional, que registra lo que las personas introducen, LAZO trabaja a partir de un objetivo y propone cómo avanzar hacia él.',
  },
  {
    q: '¿Cómo trabaja LAZO a partir de un objetivo?',
    a: 'Cada cuenta tiene un objetivo comercial explícito. A partir de él, LAZO identifica qué personas son relevantes, qué información falta, qué pasos tienen sentido y cuál es el siguiente movimiento. Si el objetivo cambia, cambian las personas relevantes, el plan y la propuesta.',
  },
  {
    q: '¿Cómo identifica rutas entre personas?',
    a: 'A partir del mapa de relaciones de la cuenta: quién conoce a quién, con quién existe relación activa y quién puede facilitar una introducción. LAZO propone la ruta; la decisión de pedirla y cómo hacerlo es de la persona.',
  },
  {
    q: '¿Puede trabajar con mi CRM?',
    a: 'LAZO contempla la importación de contactos, cuentas, oportunidades, notas y actividades desde un CRM existente. La integración continua con herramientas concretas se evalúa en cada implementación, y conviene distinguirla de la migración inicial. En la conversación de alcance se revisa qué información tienes y de dónde procede.',
  },
  {
    q: '¿Qué ocurre al cambiar el responsable de una cuenta?',
    a: 'La memoria de la cuenta no depende de la persona: conversaciones, compromisos, señales y plan siguen disponibles para quien la reciba. Es una de las razones por las que LAZO conserva la continuidad como una capacidad propia.',
  },
  {
    q: '¿Qué acciones necesitan aprobación?',
    a: 'Se define por tarea. Por defecto, actualizar el contexto de la cuenta puede ser automático, preparar movimientos queda listo para revisión y cualquier acción hacia fuera (enviar un mensaje, comprometer una fecha) requiere aprobación de la persona responsable.',
  },
  {
    q: '¿Cómo se define la implementación?',
    a: 'En una conversación inicial sobre tu proceso comercial, las fuentes de información disponibles, el tamaño del equipo y el nivel de autonomía que quieres configurar. A partir de ahí se acuerda el alcance y la configuración.',
  },
]

export default function Lazo() {
  return (
    <>
      <ProductSubnav brand="LAZO" items={sections} cta={{ label: 'Solicitar demo', href: '/contacto?interes=lazo' }} />

      <section className="product-hero">
        <div className="container">
          <Breadcrumbs items={[{ href: '/productos/lazo', label: 'Productos' }, { label: 'LAZO' }]} />
          <div className="split">
            <div>
              <p className="eyebrow">Agentic Relationship Management</p>
              <h1>Relaciones comerciales con contexto y dirección.</h1>
              <p className="lead">LAZO utiliza agentes para entender tus cuentas, conservar la memoria comercial y preparar el siguiente movimiento.</p>
              <div className="page-hero__actions">
                <Link href="/contacto?interes=lazo" className="btn btn--primary">
                  Solicitar una demo <ArrowRight />
                </Link>
                <a href="#como-funciona" className="btn btn--secondary">
                  Ver cómo funciona
                </a>
              </div>
            </div>
            <div className="panel" aria-label="Vista de una cuenta en LAZO">
              <div className="panel__head">
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="avatar" style={{ width: 28, height: 28 }}>
                    EH
                  </span>
                  Empresa Horizonte
                </span>
                <span className="badge">Ejemplo ilustrativo</span>
              </div>
              <div className="panel__body grid grid-2" style={{ gap: 18 }}>
                <div>
                  <p className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
                    Información clave
                  </p>
                  <dl className="kv">
                    <dt>Objetivo</dt>
                    <dd>Renovar contrato anual</dd>
                    <dt>Estado</dt>
                    <dd>
                      <span className="badge badge--ok">Activa</span>
                    </dd>
                    <dt>Última actividad</dt>
                    <dd>Hace 2 días</dd>
                    <dt>Compromisos</dt>
                    <dd>1 abierto</dd>
                  </dl>
                </div>
                <div>
                  <p className="small" style={{ fontWeight: 600, marginBottom: 8 }}>
                    Contactos clave
                  </p>
                  <div className="stack" style={{ gap: 8 }}>
                    {[
                      ['MC', 'María Cano', 'Directora general'],
                      ['LR', 'Luis Romero', 'Dir. de operaciones'],
                      ['AP', 'Ana Peña', 'Tecnología'],
                    ].map(([i, n, r]) => (
                      <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem' }}>
                        <span className="avatar" style={{ width: 28, height: 28, fontSize: '0.65rem' }}>
                          {i}
                        </span>
                        <span>
                          <strong style={{ display: 'block' }}>{n}</strong>
                          <span className="muted">{r}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card card--surface" style={{ gridColumn: '1 / -1', padding: 14 }}>
                  <p className="small muted" style={{ marginBottom: 4 }}>
                    Siguiente movimiento sugerido
                  </p>
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '0.9rem', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Calendar style={{ width: 18, height: 18, color: 'var(--accent)' }} /> Preparar reunión de revisión anual
                    </strong>
                    <span className="badge badge--warn">Para revisar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="que-es">
        <div className="container">
          <div className="split" style={{ alignItems: 'start' }}>
            <Reveal>
              <p className="eyebrow">Qué es LAZO</p>
              <h2>Gestión comercial alrededor de relaciones, memoria, señales, objetivos y movimientos.</h2>
              <p className="lead" style={{ marginTop: 14 }}>
                Una cuenta no es una ficha: es un conjunto de personas, conversaciones y compromisos que cambian con el tiempo. LAZO reúne ese contexto y lo usa para preparar acciones con sentido, de manera que cada movimiento parta de lo que ya se sabe y de lo que todavía falta.
              </p>
            </Reveal>
            <Reveal>
              <div className="grid grid-2" style={{ gap: 12 }}>
                {pillars.map((p) => (
                  <div className="card" key={p.t} style={{ padding: 18 }}>
                    <p.Icon style={{ width: 22, height: 22, color: 'var(--accent)', marginBottom: 8 }} />
                    <strong>{p.t}</strong>
                    <p className="small">{p.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="como-funciona">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cómo funciona</p>
            <h2>De un objetivo al siguiente paso.</h2>
            <p className="lead">LAZO acompaña cada etapa, desde la comprensión de la cuenta hasta la propuesta del siguiente movimiento.</p>
          </Reveal>
          <Reveal>
            <ol className="grid grid-3">
              {steps.map(([t, d], i) => (
                <li className="card card--surface" key={t} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, padding: 20 }}>
                  <span className="avatar" style={{ background: 'var(--accent)', color: '#fff' }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem' }}>{t}</h3>
                    <p className="small">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="capacidades">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Capacidades</p>
            <h2>Lo que LAZO aporta al trabajo comercial.</h2>
          </Reveal>
          <div className="grid grid-2" style={{ gap: 0 }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.t} className="feature-row">
                <span className="icon-box" style={{ margin: 0, width: 40, height: 40 }}>
                  <c.Icon style={{ width: 20, height: 20 }} />
                </span>
                <div>
                  <h3 style={{ fontSize: '1.05rem' }}>
                    {String(i + 1).padStart(2, '0')} · {c.t}
                  </h3>
                  <p className="small">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="demo">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Demostración interactiva</p>
            <h2>Explora una cuenta ficticia.</h2>
            <p className="lead">Cambia el objetivo comercial y observa cómo cambian las personas relevantes, la información pendiente, el plan y el siguiente movimiento. Todo es ilustrativo: no se envía ni se ejecuta nada.</p>
          </Reveal>
          <Reveal>
            <LazoDemo />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="integraciones">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Migración e integraciones</p>
            <h2>Trabaja con la información que ya tienes.</h2>
            <p className="lead">LAZO contempla cinco tipos de información. Conviene distinguir entre importar datos al inicio, integrar una herramienta de forma continua y lo que está previsto para más adelante.</p>
          </Reveal>
          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            <Reveal>
              <ul className="list-rows">
                {[
                  [Users, 'Contactos', 'Personas, roles y datos de contacto.'],
                  [Map, 'Cuentas', 'Organizaciones y su estructura.'],
                  [Target, 'Oportunidades', 'Objetivos comerciales en curso y su estado.'],
                  [Chat, 'Notas e historial', 'Conversaciones, reuniones y acuerdos registrados.'],
                  [Check, 'Tareas y actividades', 'Compromisos, seguimientos y próximos pasos.'],
                ].map(([Icon, t, d]) => {
                  const I = Icon as typeof Users
                  return (
                    <li key={t as string} style={{ alignItems: 'flex-start' }}>
                      <I style={{ marginTop: 3 }} />
                      <span>
                        <strong style={{ display: 'block' }}>{t as string}</strong>
                        <span className="muted small">{d as string}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
            <Reveal>
              <div className="table-wrap" style={{ background: '#fff' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Modalidad</th>
                      <th>Qué significa</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Importación</td>
                      <td>Carga inicial de datos desde tu CRM u hojas de cálculo para arrancar con contexto.</td>
                      <td>
                        <span className="badge badge--ok">Contemplada</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Integración</td>
                      <td>Sincronización continua con una herramienta concreta. Se evalúa herramienta por herramienta en cada implementación.</td>
                      <td>
                        <span className="badge badge--warn">Según proyecto</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Conexión futura</td>
                      <td>Herramientas previstas en la evolución del producto. No se presentan como disponibles.</td>
                      <td>
                        <span className="badge badge--neutral">Previsto</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="small muted" style={{ marginTop: 12 }}>
                La lista concreta de herramientas compatibles se confirma en la conversación de alcance. Migrar desde un CRM no equivale a una integración bidireccional con él.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="control">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Autonomía y control</p>
            <h2>Define cómo trabajan tus agentes.</h2>
            <p className="lead">La autonomía se configura por tarea. Tu equipo decide qué hace LAZO por su cuenta, qué deja preparado para revisar y qué requiere aprobación explícita.</p>
          </Reveal>
          <Reveal>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tarea</th>
                    <th>Descripción</th>
                    <th>Nivel de autonomía (ejemplo)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Actualizar contexto</td>
                    <td>Incorporar nuevas conversaciones, documentos y señales a la memoria de la cuenta.</td>
                    <td>
                      <span className="badge badge--ok">Automático</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Preparar movimientos</td>
                    <td>Proponer siguientes pasos, borradores de mensaje y material de reunión.</td>
                    <td>
                      <span className="badge">Revisable</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Acciones hacia fuera</td>
                    <td>Enviar mensajes, comprometer fechas o modificar acuerdos con el cliente.</td>
                    <td>
                      <span className="badge badge--warn">Con aprobación</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="small muted" style={{ marginTop: 12 }}>
              Los niveles mostrados son un ejemplo de configuración. Cada organización define los suyos.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="modelo">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Modelo comercial</p>
            <h2>Alcance y configuración se conversan.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              El modelo de LAZO se adapta al tamaño del equipo, a las fuentes de información y al nivel de autonomía que se quiera configurar. No publicamos tarifas: la propuesta se define en una conversación de alcance.
            </p>
          </Reveal>
          <Reveal>
            <div className="card">
              <h3>Hablemos de tu caso</h3>
              <p>Cuéntanos cómo vende tu equipo hoy, qué herramientas usa y qué quieres que mejore. Con eso preparamos una propuesta de alcance y configuración.</p>
              <Link href="/contacto?interes=lazo" className="btn btn--primary" style={{ marginTop: 18 }}>
                Conversar sobre alcance <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="preguntas">
        <div className="container split" style={{ alignItems: 'start' }}>
          <Reveal>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Resolvemos tus dudas.</h2>
          </Reveal>
          <Reveal>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </section>

      <Cta title="Conoce LAZO en una demo." text="Ve cómo puede ayudarte a construir relaciones más sólidas y avanzar tus oportunidades con contexto y dirección." button="Hablemos de LAZO" href="/contacto?interes=lazo" />
    </>
  )
}
