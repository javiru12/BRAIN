import { pageMeta } from '@/lib/metadata'
import ServicePage from '@/components/ServicePage'
import Reveal from '@/components/Reveal'
import { VisualConsultoria } from '@/components/ServiceVisuals'
import { Compass, Flask, Map, Scale, Shield, Sliders } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Consultoría especializada en IA',
  description: 'Diagnóstico de oportunidades, priorización de casos de uso, viabilidad, diseño de piloto y hoja de ruta para aplicar IA con criterio.',
  path: '/soluciones/consultoria-ia',
})

const items = [
  { Icon: Compass, t: 'Diagnóstico de oportunidades', d: 'Dónde hay trabajo repetitivo, conocimiento disperso o decisiones que esperan información. Se identifica con el equipo, no desde fuera.' },
  { Icon: Sliders, t: 'Priorización de casos de uso', d: 'Valor esperado, esfuerzo, dependencias y riesgo de cada caso. El resultado es un orden razonado, no una lista de deseos.' },
  { Icon: Scale, t: 'Evaluación de viabilidad', d: 'Si existen los datos, si los sistemas permiten integrarse, si el proceso está lo bastante definido y qué restricciones hay.' },
  { Icon: Flask, t: 'Diseño de piloto', d: 'Un alcance pequeño con criterios de éxito claros, para aprender con evidencia antes de ampliar.' },
  { Icon: Map, t: 'Hoja de ruta', d: 'Fases, decisiones y capacidades necesarias para avanzar del piloto a una solución en uso.' },
  { Icon: Shield, t: 'Adopción y gobierno', d: 'Responsables, políticas, permisos y supervisión que deben existir para que la IA se use con control.' },
]

export default function Consultoria() {
  return (
    <ServicePage
      slug="consultoria-ia"
      eyebrow="Consultoría especializada"
      h1="Claridad para decidir dónde y cómo aplicar IA."
      lead="Antes de construir, conviene saber qué merece la pena construir. Ayudamos a identificar oportunidades reales, descartar las que no lo son y definir un camino con pasos verificables."
      cta={{ label: 'Definamos por dónde empezar', interest: 'consultoria' }}
      visual={<VisualConsultoria />}
    >
      <section className="section section--border">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Qué hacemos</p>
            <h2>De la pregunta abierta a un plan concreto.</h2>
          </Reveal>
          <div className="grid grid-3">
            {items.map((f) => (
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
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Entregables</p>
            <h2>Lo que suele salir de una fase de consultoría.</h2>
            <p className="lead" style={{ marginTop: 14 }}>
              Son ejemplos. Los entregables concretos dependen del alcance que acordemos para cada proyecto.
            </p>
          </Reveal>
          <Reveal>
            <ul className="list-rows">
              {['Mapa de oportunidades con su valoración', 'Casos de uso priorizados y argumentados', 'Informe de viabilidad técnica y de datos', 'Diseño de piloto con criterios de éxito', 'Hoja de ruta por fases', 'Recomendaciones de gobierno y adopción'].map((e) => (
                <li key={e}>
                  <Compass /> {e}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </ServicePage>
  )
}
