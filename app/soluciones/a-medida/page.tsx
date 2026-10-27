import { pageMeta } from '@/lib/metadata'
import ServicePage from '@/components/ServicePage'
import Reveal from '@/components/Reveal'
import { Check, Database, Doc, Plug, Settings, Target, Users } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Soluciones de IA a medida',
  description: 'Diseñamos y desarrollamos soluciones de inteligencia artificial alrededor de los procesos, sistemas y objetivos de tu empresa.',
  path: '/soluciones/a-medida',
})

const blocks = [
  { Icon: Target, t: 'Comprensión del proceso y objetivo', d: 'Qué ocurre hoy, quién interviene, qué decisiones se toman y qué resultado debe mejorar. Sin esto no hay diseño.' },
  { Icon: Settings, t: 'Diseño funcional y técnico', d: 'Qué hace la solución, qué no hace, cómo se integra y qué componentes necesita: modelos, agentes, interfaces, servicios.' },
  { Icon: Doc, t: 'Fuentes de contexto', d: 'Documentos, sistemas, conversaciones y datos que la solución puede consultar, con sus permisos y su grado de confianza.' },
  { Icon: Plug, t: 'Herramientas e integraciones contempladas', d: 'Acciones que la solución puede ejecutar sobre tus sistemas: leer, preparar, registrar, notificar. Cada una se define y se limita.' },
  { Icon: Users, t: 'Interacción con las personas', d: 'Dónde aparece la solución en el trabajo, qué propone, qué pide confirmar y cómo se corrige cuando se equivoca.' },
  { Icon: Check, t: 'Validación y adopción', d: 'Casos reales para evaluar el comportamiento, criterios acordados y acompañamiento del equipo que la va a usar.' },
]

const examples = [
  { t: 'Asistente para preparar solicitudes internas', d: 'Reúne la información necesaria de varios sistemas, detecta lo que falta y prepara la solicitud para que una persona la revise y la envíe.' },
  { t: 'Clasificación y enrutado de incidencias', d: 'Interpreta la incidencia, consulta el histórico y propone a qué equipo corresponde, con un motivo visible y posibilidad de corrección.' },
  { t: 'Resumen operativo diario', d: 'Compila lo relevante de varias fuentes autorizadas en un informe breve con enlaces a los datos originales.' },
]

export default function AMedida() {
  return (
    <ServicePage
      slug="a-medida"
      eyebrow="Soluciones a medida"
      h1="Una solución de IA para la forma en que trabaja tu empresa."
      lead="No partimos de una herramienta genérica, sino de tu proceso: qué información existe, qué decisiones se toman y qué resultado tiene que mejorar."
      cta={{ label: 'Diseñemos tu solución', interest: 'a-medida' }}
      visual={
        <div className="panel">
          <div className="panel__head">
            Alcance de una solución <span className="badge badge--neutral">Ejemplo ilustrativo</span>
          </div>
          <div className="panel__body">
            <dl className="kv">
              <dt>Proceso</dt>
              <dd>Preparación de solicitudes internas</dd>
              <dt>Fuentes</dt>
              <dd>Sistema de pedidos, políticas internas, histórico</dd>
              <dt>Herramientas</dt>
              <dd>Lectura de pedidos · Borrador de solicitud</dd>
              <dt>Revisión</dt>
              <dd>Una persona aprueba antes de enviar</dd>
              <dt>Evaluación</dt>
              <dd>Casos reales acordados con el equipo</dd>
            </dl>
          </div>
        </div>
      }
    >
      <section className="section section--border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Qué definimos</p>
            <h2>Seis decisiones que dan forma a la solución.</h2>
          </Reveal>
          <div className="grid grid-3">
            {blocks.map((b) => (
              <Reveal key={b.t} className="card">
                <span className="icon-box">
                  <b.Icon />
                </span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Ejemplos de proyecto</p>
            <h2>Posibles soluciones, no productos existentes.</h2>
            <p className="lead">Ilustran el tipo de trabajo que se puede abordar. Cada proyecto se define con su propio alcance.</p>
          </Reveal>
          <div>
            {examples.map((e, i) => (
              <Reveal key={e.t} className="feature-row">
                <span className="feature-row__num">0{i + 1}</span>
                <div>
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mini" style={{ marginTop: 32, justifyContent: 'flex-start', flexWrap: 'wrap' }} aria-label="Esquema de una solución a medida">
              <span className="mini__node">
                <Database /> Sistemas
              </span>
              <span className="mini__node">
                <Doc /> Documentos
              </span>
              <i className="mini__arrow" />
              <span className="mini__node mini__node--accent">
                <Settings /> Solución a medida
              </span>
              <i className="mini__arrow" />
              <span className="mini__node">
                <Users /> Revisión
              </span>
              <i className="mini__arrow" />
              <span className="mini__node">
                <Check /> Resultado
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </ServicePage>
  )
}
