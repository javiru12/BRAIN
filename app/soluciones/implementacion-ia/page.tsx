import { pageMeta } from '@/lib/metadata'
import ServicePage from '@/components/ServicePage'
import Reveal from '@/components/Reveal'
import Tabs from '@/components/Tabs'
import { VisualImplementacion } from '@/components/ServiceVisuals'
import { Chart, FileCheck, Plug, Users } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Implementación de IA en tu entorno de trabajo',
  description: 'Integración, validación, adopción y operación de soluciones de IA. Definimos alcance, fuentes, permisos, criterios de evaluación y responsables.',
  path: '/soluciones/implementacion-ia',
})

const fronts = [
  { Icon: Plug, t: 'Integración', d: 'Conectar la solución con los sistemas, datos y canales donde ocurre el trabajo: ERP, CRM, repositorios documentales, mensajería, herramientas internas.' },
  { Icon: FileCheck, t: 'Validación', d: 'Comprobar el comportamiento con casos reales antes de abrirla al equipo: precisión, límites, manejo de información incompleta, tiempos.' },
  { Icon: Users, t: 'Adopción', d: 'Que las personas sepan qué hace la solución, qué no hace y cómo corregirla. Formación breve, acompañamiento inicial y canal de incidencias.' },
  { Icon: Chart, t: 'Operación', d: 'Seguimiento del uso, de los errores y de los costes. Ajustes periódicos a partir de la evidencia registrada.' },
]

const defs = [
  { id: 'alcance', label: 'Alcance', content: <p className="muted">Qué procesos, qué equipos y qué casos cubre la implementación en su primera fase. Lo que queda fuera se escribe también, para evitar expectativas que la solución no va a cumplir.</p> },
  { id: 'fuentes', label: 'Fuentes de información', content: <p className="muted">Qué sistemas y documentos se conectan, con qué frecuencia se actualizan y qué grado de confianza tiene cada uno. Una fuente desactualizada produce respuestas convincentes y erróneas.</p> },
  { id: 'permisos', label: 'Permisos', content: <p className="muted">Qué puede leer y qué puede hacer la solución, y en nombre de quién. Los permisos de la solución no superan los de la persona que la usa.</p> },
  { id: 'criterios', label: 'Criterios de evaluación', content: <p className="muted">Cómo sabremos que funciona: conjunto de casos de prueba, umbrales acordados y qué tipo de error es aceptable y cuál no.</p> },
  { id: 'responsables', label: 'Responsables', content: <p className="muted">Quién es dueño del proceso, quién revisa las propuestas de la solución, quién atiende incidencias y quién decide cambios en políticas o permisos.</p> },
]

export default function Implementacion() {
  return (
    <ServicePage
      slug="implementacion-ia"
      eyebrow="Implementación de IA"
      h1="Llevamos la IA al entorno donde ocurre el trabajo."
      lead="Una solución que funciona en una demo todavía no funciona en tu empresa. Integrarla, validarla con casos reales y acompañar su adopción es lo que la convierte en parte del trabajo."
      cta={{ label: 'Hablemos de tu implementación', interest: 'implementacion' }}
      visual={<VisualImplementacion />}
    >
      <section className="section section--border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cuatro frentes</p>
            <h2>Integrar, validar, adoptar y operar.</h2>
          </Reveal>
          <div className="grid grid-4">
            {fronts.map((f) => (
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

      <section className="section section--surface">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Qué se define</p>
            <h2>Lo que acordamos antes de desplegar.</h2>
          </Reveal>
          <Reveal>
            <div className="card">
              <Tabs label="Definiciones de la implementación" items={defs} />
            </div>
          </Reveal>
        </div>
      </section>
    </ServicePage>
  )
}
