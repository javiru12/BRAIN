import { pageMeta } from '@/lib/metadata'
import ServicePage from '@/components/ServicePage'
import Reveal from '@/components/Reveal'
import AgentJourney from '@/components/AgentJourney'
import { VisualAgentes } from '@/components/ServiceVisuals'
import { Alert, Chart, Database, Lock, Wrench } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Agentes de IA con contexto y herramientas',
  description: 'Agentes que utilizan contexto autorizado y herramientas definidas para hacer avanzar el trabajo, con revisión humana donde corresponde.',
  path: '/soluciones/agentes-ia',
})

const facets = [
  { Icon: Wrench, t: 'Qué puede hacer', d: 'Tareas delimitadas: reunir información, preparar borradores, clasificar, comparar, proponer un siguiente paso. Lo que puede hacer se define por escrito en el diseño.' },
  { Icon: Database, t: 'Qué información puede consultar', d: 'Solo las fuentes autorizadas para esa tarea, con los permisos de la persona o del rol que lo utiliza. El perímetro se configura, no se improvisa.' },
  { Icon: Lock, t: 'Qué necesita aprobación', d: 'Cualquier acción con efecto hacia fuera o con consecuencias difíciles de revertir: enviar, comprometer, modificar registros. Se decide por tarea.' },
  { Icon: Alert, t: 'Qué ocurre cuando falta información', d: 'El agente lo señala y pide lo que falta o deja el hueco visible. No rellena con suposiciones presentadas como datos.' },
  { Icon: Chart, t: 'Cómo se evalúa su comportamiento', d: 'Con casos de prueba acordados, registro de las decisiones y revisión periódica de errores, correcciones y resultados.' },
]

export default function Agentes() {
  return (
    <ServicePage
      slug="agentes-ia"
      eyebrow="Agentes de IA"
      h1="Agentes que utilizan contexto y herramientas para hacer avanzar el trabajo."
      lead="Un agente de IA es un sistema que recibe un objetivo, consulta la información que tiene permitida, usa herramientas concretas para avanzar y pide revisión cuando corresponde."
      cta={{ label: 'Exploremos un caso de uso', interest: 'agentes' }}
      visual={<VisualAgentes />}
    >
      <section className="section section--border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">En lenguaje sencillo</p>
            <h2>Qué es un agente y qué lo diferencia de un chat.</h2>
            <p className="lead">
              Un chat responde a lo que le escribes. Un agente trabaja hacia un objetivo: decide qué consultar, en qué orden, qué herramienta usar y cuándo detenerse para que una persona revise. Por eso los límites y los permisos forman parte del diseño desde el principio.
            </p>
          </Reveal>
          <Reveal>
            <AgentJourney />
          </Reveal>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Lo que se define en cada agente</p>
            <h2>Cinco preguntas con respuesta antes de ponerlo a trabajar.</h2>
          </Reveal>
          <div className="grid grid-3">
            {facets.map((f) => (
              <Reveal key={f.t} className="card">
                <span className="icon-box">
                  <f.Icon />
                </span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </ServicePage>
  )
}
