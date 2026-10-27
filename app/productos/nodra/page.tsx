import Link from 'next/link'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductSubnav from '@/components/ProductSubnav'
import Reveal from '@/components/Reveal'
import Accordion from '@/components/Accordion'
import Tabs from '@/components/Tabs'
import Cta from '@/components/Cta'
import NodraArchitecture from '@/components/nodra/NodraArchitecture'
import NodraFlow from '@/components/nodra/NodraFlow'
import NodraAudit from '@/components/nodra/NodraAudit'
import { ArrowRight, Bot, Building, Check, Chart, Cloud, Coins, Eye, FileCheck, Flask, Headset, Heart, Lock, Scale, Server, Settings, Shield, Users } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Nodra: gobierno y control de tu ecosistema de IA',
  description: 'Nodra reúne políticas, supervisión y visibilidad para agentes, modelos, herramientas y flujos de trabajo. Módulos Riel, Faro, Caudal y Simulacro.',
  path: '/productos/nodra',
})

const sections = [
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'auditoria', label: 'Auditoría' },
  { id: 'profundidad', label: 'En detalle' },
  { id: 'casos', label: 'Casos de uso' },
  { id: 'despliegue', label: 'Despliegue' },
  { id: 'preguntas', label: 'Preguntas' },
]

const modules = [
  {
    id: 'riel',
    label: 'Riel',
    icon: <Shield />,
    content: (
      <div className="split" style={{ alignItems: 'start' }}>
        <div>
          <h3>Riel · Políticas y controles para agentes</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            Define qué puede hacer cada agente: qué contenido puede generar, qué herramientas puede usar, cómo debe tratar los datos y qué acciones requieren aprobación de una persona. Las políticas se aplican en el momento en que el agente propone actuar.
          </p>
          <ul className="prose muted" style={{ marginTop: 12 }}>
            <li>Políticas de contenido: qué se permite generar y qué no.</li>
            <li>Políticas de herramientas: acciones permitidas, restringidas o con aprobación.</li>
            <li>Manejo de datos: qué información puede consultarse y qué no debe salir.</li>
            <li>Aprobación de acciones: quién revisa y con qué contexto.</li>
          </ul>
        </div>
        <div className="panel">
          <div className="panel__head">
            Política de un agente <span className="badge">Ejemplo ilustrativo</span>
          </div>
          <div className="panel__body">
            <dl className="kv">
              <dt>Agente</dt>
              <dd>Agente comercial</dd>
              <dt>Herramientas</dt>
              <dd>Lectura CRM · Borradores · Envío (aprobación)</dd>
              <dt>Datos</dt>
              <dd>Sin datos de facturación</dd>
              <dt>Aprobación</dt>
              <dd>Responsable comercial</dd>
            </dl>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'faro',
    label: 'Faro',
    icon: <Eye />,
    content: (
      <div className="split" style={{ alignItems: 'start' }}>
        <div>
          <h3>Faro · Gobierno del uso de herramientas de IA por personas</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            Las personas de una organización usan herramientas de IA SaaS para trabajar. Faro gobierna ese acceso: quién puede usar qué herramienta, cómo se solicita y aprueba, qué confirmaciones se piden y cómo se revisa el acceso con el tiempo.
          </p>
          <ul className="prose muted" style={{ marginTop: 12 }}>
            <li>Catálogo de herramientas de IA permitidas y su estado.</li>
            <li>Ciclo de solicitud y aprobación de acceso.</li>
            <li>Confirmaciones de uso responsable y revisión periódica.</li>
            <li>Visibilidad de quién usa qué.</li>
          </ul>
        </div>
        <div className="panel">
          <div className="panel__head">
            Solicitud de acceso <span className="badge">Ejemplo ilustrativo</span>
          </div>
          <div className="panel__body timeline">
            {[
              ['Solicitud', 'Una persona pide acceso a una herramienta de IA.'],
              ['Evaluación', 'El responsable revisa el uso previsto y los datos implicados.'],
              ['Confirmación', 'La persona acepta las condiciones de uso.'],
              ['Revisión', 'El acceso se revisa pasado un periodo definido.'],
            ].map(([t, d]) => (
              <div className="timeline__item" key={t}>
                <span className="timeline__dot">
                  <Check />
                </span>
                <div>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'caudal',
    label: 'Caudal',
    icon: <Coins />,
    content: (
      <div className="split" style={{ alignItems: 'start' }}>
        <div>
          <h3>Caudal · Visibilidad, asignación y administración del gasto en IA</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            El gasto en modelos y herramientas de IA se reparte entre agentes, equipos y casos de uso. Caudal lo hace visible, lo asigna a quien corresponde y permite administrarlo con límites y alertas.
          </p>
          <ul className="prose muted" style={{ marginTop: 12 }}>
            <li>Seguimiento de costes por modelo, agente, equipo o flujo.</li>
            <li>Asignación del gasto a áreas o proyectos.</li>
            <li>Límites y avisos configurables.</li>
          </ul>
        </div>
        <div className="panel">
          <div className="panel__head">
            Gasto por agente <span className="badge">Ejemplo ilustrativo</span>
          </div>
          <div className="panel__body stack" style={{ gap: 10 }}>
            {[
              ['Agente comercial', 62],
              ['Asistente de conocimiento', 38],
              ['Flujo operativo', 21],
            ].map(([n, v]) => (
              <div key={n as string}>
                <div className="row small" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>{n as string}</span>
                  <span className="muted">valor ilustrativo</span>
                </div>
                <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4 }}>
                  <div style={{ width: `${v}%`, height: '100%', background: 'var(--accent)', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'simulacro',
    label: 'Simulacro',
    icon: <Flask />,
    content: (
      <div className="split" style={{ alignItems: 'start' }}>
        <div>
          <h3>Simulacro · Evaluación de riesgos y análisis de políticas</h3>
          <p className="muted" style={{ marginTop: 8 }}>
            Antes de poner un agente o una política en producción, conviene saber cómo se comportaría ante escenarios de riesgo. Simulacro permite evaluar categorías de riesgo y analizar si las políticas definidas cubren los casos que preocupan.
          </p>
          <ul className="prose muted" style={{ marginTop: 12 }}>
            <li>Categorías de riesgo: fuga de datos, acciones no autorizadas, contenido inadecuado, uso fuera de alcance.</li>
            <li>Análisis de cobertura de las políticas frente a esos escenarios.</li>
            <li>Resultados orientados a ajustar políticas antes de operar.</li>
          </ul>
          <div className="notice" style={{ marginTop: 14 }}>
            <strong>Demostración y producción.</strong> La demostración de Simulacro muestra el tipo de análisis con escenarios de ejemplo. En producción, el análisis se realiza sobre las políticas y los agentes reales de la organización. Las cifras de una demo no son resultados reales.
          </div>
        </div>
        <div className="panel">
          <div className="panel__head">
            Escenarios evaluados <span className="badge">Ejemplo ilustrativo</span>
          </div>
          <div className="panel__body list-rows">
            {[
              ['Intento de extraer datos de clientes', 'Cubierto por política de datos', 'ok'],
              ['Envío externo sin aprobación', 'Cubierto por política de comunicaciones', 'ok'],
              ['Uso de herramienta fuera de alcance', 'Política pendiente de definir', 'warn'],
            ].map(([t, d, b]) => (
              <div key={t} style={{ alignItems: 'flex-start' }}>
                <Shield style={{ marginTop: 2 }} />
                <span style={{ flex: 1 }}>
                  <strong style={{ display: 'block' }}>{t}</strong>
                  <span className="muted small">{d}</span>
                </span>
                <span className={`badge badge--${b}`}>{b === 'ok' ? 'Cubierto' : 'Revisar'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
]

const depth = [
  { Icon: Users, t: 'Ciclo de solicitud y aprobación de herramientas', d: 'Una persona solicita acceso a una herramienta de IA, un responsable la evalúa y, si procede, la aprueba con condiciones.' },
  { Icon: Check, t: 'Confirmaciones y revisión del acceso', d: 'Quien recibe acceso confirma las condiciones de uso. El acceso se revisa periódicamente y puede retirarse.' },
  { Icon: Eye, t: 'Observabilidad de actividad y errores', d: 'Qué agentes han actuado, qué herramientas han usado, qué ha fallado y con qué frecuencia.' },
  { Icon: FileCheck, t: 'Registro de acciones y aprobaciones', d: 'Cada acción relevante y cada decisión humana quedan registradas con su contexto.' },
  { Icon: Coins, t: 'Seguimiento de costes', d: 'Coste por modelo, agente, equipo o flujo, con límites y avisos configurables.' },
  { Icon: Settings, t: 'Automatizaciones publicadas', d: 'Flujos de trabajo con IA que la organización ha revisado y puesto a disposición de sus equipos bajo políticas definidas.' },
  { Icon: Scale, t: 'Categorías de riesgo', d: 'Fuga de datos, acciones no autorizadas, contenido inadecuado y uso fuera de alcance, entre otras.' },
  { Icon: Flask, t: 'Demo de Simulacro frente a producción', d: 'La demo usa escenarios de ejemplo. En producción, el análisis se hace sobre las políticas y los agentes reales.' },
]

const useCases = [
  {
    id: 'banca',
    label: 'Banca',
    icon: <Building />,
    scenario: 'Un agente ayuda a preparar respuestas a consultas de clientes y propuestas de productos.',
    controls: ['Política de datos: sin exposición de información de cuentas fuera del canal autorizado.', 'Aprobación de cualquier comunicación con condiciones económicas.', 'Registro completo de propuestas y decisiones.'],
    human: 'Un gestor revisa y aprueba cada propuesta antes de que llegue al cliente. Las políticas se definen con cumplimiento normativo.',
  },
  {
    id: 'atencion',
    label: 'Atención al cliente',
    icon: <Headset />,
    scenario: 'Agentes que redactan respuestas y clasifican solicitudes en un centro de atención.',
    controls: ['Política de contenido: tono, alcance y temas que no deben tratarse automáticamente.', 'Herramientas restringidas: consultar sí, modificar datos del cliente solo con aprobación.', 'Observabilidad de errores y escalados.'],
    human: 'Los casos sensibles o con baja confianza se escalan a una persona. Los supervisores revisan muestras de respuestas de forma periódica.',
  },
  {
    id: 'operaciones',
    label: 'Operaciones',
    icon: <Settings />,
    scenario: 'Un flujo operativo coordina solicitudes entre varios sistemas con ayuda de agentes.',
    controls: ['Aprobaciones en los pasos con impacto económico o contractual.', 'Políticas de herramientas por sistema integrado.', 'Trazabilidad de cada paso ejecutado.'],
    human: 'El responsable del proceso aprueba excepciones y revisa los registros para ajustar las políticas cuando aparecen patrones nuevos.',
  },
  {
    id: 'cumplimiento',
    label: 'Cumplimiento',
    icon: <Scale />,
    scenario: 'El área de cumplimiento necesita saber qué IA se usa, con qué datos y bajo qué reglas.',
    controls: ['Inventario de agentes, modelos y herramientas en uso.', 'Políticas documentadas y versionadas.', 'Registros consultables de acciones y aprobaciones.'],
    human: 'Cumplimiento define y revisa políticas; los responsables de cada área las aplican. Nodra aporta la evidencia, no sustituye el criterio ni garantiza conformidad regulatoria.',
  },
  {
    id: 'salud',
    label: 'Salud',
    icon: <Heart />,
    scenario: 'Asistentes que ayudan a preparar documentación administrativa y resúmenes internos.',
    controls: ['Política estricta de manejo de datos personales y de salud.', 'Acceso a fuentes limitado por rol.', 'Aprobación obligatoria para cualquier salida de información.'],
    human: 'El personal sanitario y administrativo revisa cada documento. Las políticas se definen con los responsables de protección de datos de la organización.',
  },
].map((u) => ({
  id: u.id,
  label: u.label,
  icon: u.icon,
  content: (
    <div className="grid grid-3" style={{ alignItems: 'start' }}>
      <div className="card card--surface">
        <span className="badge badge--neutral" style={{ marginBottom: 10 }}>
          Escenario
        </span>
        <p style={{ color: 'var(--text)' }}>{u.scenario}</p>
      </div>
      <div className="card card--surface">
        <span className="badge badge--neutral" style={{ marginBottom: 10 }}>
          Controles relevantes
        </span>
        <ul className="prose small muted">
          {u.controls.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="card card--surface">
        <span className="badge badge--neutral" style={{ marginBottom: 10 }}>
          Supervisión humana
        </span>
        <p className="small">{u.human}</p>
      </div>
    </div>
  ),
}))

const faq = [
  { q: '¿Qué gobierna Nodra?', a: 'Agentes, modelos, herramientas, aplicaciones de IA, flujos de trabajo y las políticas, aprobaciones y registros asociados. Es una capa transversal de gobierno y control, no una herramienta de búsqueda documental.' },
  { q: '¿Cómo se definen políticas y responsables?', a: 'Las políticas las definen los responsables de la organización (tecnología, cumplimiento, áreas de negocio) y se aplican a agentes, herramientas y flujos. Cada política tiene un responsable y puede revisarse y versionarse.' },
  { q: '¿Cuándo necesita aprobación una acción?', a: 'Cuando la política aplicable lo indica: normalmente acciones con efecto externo, con datos sensibles o con impacto económico. La organización decide qué acciones y quién las aprueba.' },
  { q: '¿Qué diferencia hay entre Riel y Faro?', a: 'Riel gobierna lo que hacen los agentes de IA: contenido, herramientas, datos y acciones. Faro gobierna el uso que hacen las personas de herramientas de IA SaaS: acceso, solicitudes, confirmaciones y revisión.' },
  { q: '¿Cómo se observa actividad y gasto?', a: 'Mediante registros de acciones, aprobaciones y errores, y el seguimiento de costes por modelo, agente, equipo o flujo. Caudal permite además asignar el gasto y configurar límites y avisos.' },
  { q: '¿Qué muestra la demostración de Simulacro?', a: 'El tipo de análisis que realiza: escenarios de riesgo y cobertura de las políticas. Usa ejemplos, no datos de tu organización. En producción, el análisis se hace sobre tus políticas y agentes reales.' },
  { q: '¿Qué opciones de despliegue existen?', a: 'Nube, privado y soberano. El alcance concreto de cada opción depende de los requisitos técnicos, de residencia de datos y del proyecto. Se concreta en la conversación de alcance.' },
]

export default function Nodra() {
  return (
    <>
      <ProductSubnav brand="Nodra" items={sections} cta={{ label: 'Solicitar demo', href: '/contacto?interes=nodra' }} />

      <section className="product-hero" id="plataforma">
        <div className="container">
          <Breadcrumbs items={[{ href: '/productos/nodra', label: 'Productos' }, { label: 'Nodra' }]} />
          <div className="split">
            <div>
              <p className="eyebrow">Gobierno y control de IA empresarial</p>
              <h1>Gobierno y control para tu ecosistema de IA.</h1>
              <p className="lead">Nodra reúne políticas, supervisión y visibilidad para agentes, modelos, herramientas y flujos de trabajo.</p>
              <div className="page-hero__actions">
                <Link href="/contacto?interes=nodra" className="btn btn--primary">
                  Solicitar una demo <ArrowRight />
                </Link>
                <a href="#modulos" className="btn btn--secondary">
                  Explorar módulos
                </a>
              </div>
            </div>
            <div className="panel" aria-label="Vista del ecosistema de IA en Nodra">
              <div className="panel__head">
                Ecosistema de IA <span className="badge">Ejemplo ilustrativo</span>
              </div>
              <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Componente</th>
                      <th>Responsable</th>
                      <th>Política</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Bot style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--accent)' }} />
                        Agente comercial
                      </td>
                      <td>Comercial</td>
                      <td>Estándar</td>
                      <td>
                        <span className="badge badge--ok">Activo</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Bot style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--accent)' }} />
                        Asistente interno
                      </td>
                      <td>TI</td>
                      <td>Restringida</td>
                      <td>
                        <span className="badge badge--warn">En revisión</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Settings style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--accent)' }} />
                        Flujo operativo
                      </td>
                      <td>Operaciones</td>
                      <td>Estándar</td>
                      <td>
                        <span className="badge badge--ok">Activo</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Eye style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6, color: 'var(--accent)' }} />
                        Herramienta SaaS de IA
                      </td>
                      <td>RR. HH.</td>
                      <td>Con confirmación</td>
                      <td>
                        <span className="badge badge--ok">Activo</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--surface" id="que-es">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Qué es Nodra</p>
            <h2>Una capa de control para la IA de tu organización.</h2>
            <p className="lead">
              A medida que aparecen agentes, modelos, herramientas y flujos de IA en distintas áreas, hace falta una capa transversal que aplique políticas, pida aprobaciones cuando corresponde y registre lo que ocurre. Nodra es esa capa. Su alcance incluye agentes, modelos, herramientas, flujos, políticas, aprobaciones y registros.
            </p>
          </Reveal>
          <Reveal>
            <NodraArchitecture />
          </Reveal>
        </div>
      </section>

      <section className="section" id="modulos">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Módulos</p>
            <h2>Cuatro módulos. Una visión de conjunto.</h2>
            <p className="lead">Cada módulo cubre un frente del gobierno de IA. Explóralos sin salir de esta página.</p>
          </Reveal>
          <Reveal>
            <Tabs label="Módulos de Nodra" items={modules} />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="como-funciona">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cómo funciona</p>
            <h2>Así se supervisa una acción.</h2>
            <p className="lead">Desde la propuesta de un agente hasta su registro. Compara una acción permitida con otra que necesita revisión.</p>
          </Reveal>
          <Reveal>
            <NodraFlow />
          </Reveal>
        </div>
      </section>

      <section className="section" id="auditoria">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Auditoría</p>
            <h2>Qué se le pregunta a la IA, quién lo hace y bajo qué reglas.</h2>
            <p className="lead">
              Con Faro ves la actividad de las personas con herramientas de IA; con Riel, la de los agentes que ya viven en tu organización. Conectas un agente a Nodra, defines las reglas y cada evento queda registrado con su resultado.
            </p>
          </Reveal>
          <Reveal>
            <NodraAudit />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="profundidad">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">En detalle</p>
            <h2>Lo que Nodra pone sobre la mesa.</h2>
          </Reveal>
          <div className="grid grid-4">
            {depth.map((d) => (
              <Reveal key={d.t} className="card" >
                <span className="icon-box">
                  <d.Icon />
                </span>
                <h3 style={{ fontSize: '1.05rem' }}>{d.t}</h3>
                <p className="small">{d.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="casos">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Casos de uso</p>
            <h2>Aplicaciones según tu operación.</h2>
            <p className="lead">Escenarios posibles de aplicación del producto. No son casos de clientes ni garantías de cumplimiento regulatorio.</p>
          </Reveal>
          <Reveal>
            <Tabs label="Casos de uso de Nodra" items={useCases} />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface" id="despliegue">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Despliegue</p>
            <h2>Opciones de despliegue.</h2>
            <p className="lead">Tres opciones publicadas. El alcance de cada una depende de los requisitos técnicos y del proyecto.</p>
          </Reveal>
          <div className="grid grid-3">
            {[
              [Cloud, 'Nube', 'Despliegue gestionado en infraestructura en la nube. Las condiciones concretas se definen en cada proyecto.'],
              [Server, 'Privado', 'Despliegue en la infraestructura de la organización, con control sobre los datos y el entorno.'],
              [Lock, 'Soberano', 'Opción para entornos con requisitos específicos de residencia y soberanía de datos.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as typeof Cloud
              return (
                <Reveal key={t as string} className="card">
                  <span className="icon-box">
                    <I />
                  </span>
                  <h3>{t as string}</h3>
                  <p>{d as string}</p>
                </Reveal>
              )
            })}
          </div>
          <p className="small muted" style={{ marginTop: 16 }}>
            Ninguna opción implica por sí misma disponibilidad garantizada ni residencia de datos por defecto: se acuerdan en el alcance.
          </p>
        </div>
      </section>

      <section className="section" id="preguntas">
        <div className="container split" style={{ alignItems: 'start' }}>
          <Reveal>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Preguntas frecuentes.</h2>
            <p className="lead" style={{ marginTop: 12 }}>
              <Chart style={{ width: 18, height: 18, display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
              Si tu duda no está aquí, cuéntanosla en la demo.
            </p>
          </Reveal>
          <Reveal>
            <Accordion items={faq} />
          </Reveal>
        </div>
      </section>

      <Cta title="Conoce Nodra en una demo." text="Vemos contigo cómo aplicar políticas, aprobaciones y visibilidad al ecosistema de IA de tu organización." button="Hablemos de Nodra" href="/contacto?interes=nodra" />
    </>
  )
}
