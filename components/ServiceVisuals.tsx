import { Bot, Chart, Check, Cloud, Database, Doc, FileCheck, Plug, Settings, Target, Users } from './Icons'

/** Mini diagramas para las filas de servicios. Puramente explicativos. */
export function VisualAMedida() {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__col">
        <span className="mini__node">
          <Doc /> Proceso
        </span>
        <span className="mini__node">
          <Target /> Objetivo
        </span>
      </div>
      <i className="mini__arrow" />
      <span className="mini__node mini__node--accent">
        <Settings /> Diseño
      </span>
      <i className="mini__arrow" />
      <div className="mini__col">
        <span className="mini__node">
          <Check /> Validación
        </span>
        <span className="mini__node">
          <Users /> Adopción
        </span>
      </div>
    </div>
  )
}

export function VisualAgentes() {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__col">
        <span className="mini__node">
          <Database /> Sistemas
        </span>
        <span className="mini__node">
          <Doc /> Documentos
        </span>
        <span className="mini__node">
          <Cloud /> Servicios
        </span>
      </div>
      <i className="mini__arrow" />
      <span className="mini__node mini__node--accent">
        <Bot /> Agente
      </span>
      <i className="mini__arrow" />
      <div className="mini__col">
        <span className="mini__node">
          <Check /> Tarea
        </span>
        <span className="mini__node">
          <Users /> Revisión
        </span>
      </div>
    </div>
  )
}

export function VisualImplementacion() {
  return (
    <div className="mini" aria-hidden="true">
      <span className="mini__node">
        <Plug /> Integrar
      </span>
      <i className="mini__arrow" />
      <span className="mini__node">
        <FileCheck /> Validar
      </span>
      <i className="mini__arrow" />
      <span className="mini__node">
        <Users /> Adoptar
      </span>
      <i className="mini__arrow" />
      <span className="mini__node mini__node--accent">
        <Chart /> Operar
      </span>
    </div>
  )
}

export function VisualConsultoria() {
  const steps = ['Entender', 'Priorizar', 'Validar', 'Planificar']
  return (
    <div className="mini" aria-hidden="true" style={{ gap: 0 }}>
      {steps.map((s, i) => (
        <span key={s} style={{ display: 'contents' }}>
          <span className={`mini__node${i === 0 ? ' mini__node--accent' : ''}`}>{s}</span>
          {i < steps.length - 1 && <i className="mini__arrow" />}
        </span>
      ))}
    </div>
  )
}
