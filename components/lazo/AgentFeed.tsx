'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '@/lib/useInView'
import { Alert, Calendar, Check, Doc, Refresh, Route, Signal, Users } from '../Icons'

const ROWS = [
  { time: '09:14', Icon: Users, agent: 'Agente de Relaciones', text: 'Detectó un nuevo contacto relevante en Grupo Altamira.', tag: 'Nuevo contacto', tone: '' },
  { time: '09:17', Icon: Signal, agent: 'Agente de Señales', text: 'Encontró una posible expansión en Querétaro.', tag: 'Señal de oportunidad', tone: 'badge--ok' },
  { time: '09:18', Icon: Doc, agent: 'Agente de Memoria', text: 'Actualizó el contexto de la cuenta.', tag: 'Contexto actualizado', tone: '' },
  { time: '09:21', Icon: Route, agent: 'Agente de Acción', text: 'Preparó un seguimiento para Mariana.', tag: '', tone: '' },
]

/** Bitácora ilustrativa de agentes trabajando. Datos ficticios. */
export default function AgentFeed() {
  const { ref, seen } = useInView<HTMLDivElement>(0.3)
  const [shown, setShown] = useState(0)
  const [run, setRun] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!seen) return
    setOpen(false)
    if (prefersReducedMotion()) {
      setShown(ROWS.length)
      return
    }
    setShown(0)
    const timers = ROWS.map((_, i) => window.setTimeout(() => setShown(i + 1), 500 + i * 900))
    return () => timers.forEach(clearTimeout)
  }, [seen, run])

  return (
    <div ref={ref}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="badge badge--neutral">Ejemplo ilustrativo · datos ficticios</span>
        <button className="hm__ctrl" onClick={() => setRun(run + 1)}>
          <Refresh /> Repetir
        </button>
      </div>
      <ol className="feed" aria-live="polite">
        {ROWS.map((r, i) => (
          <li key={r.time} className={`feed__row${i < shown ? ' is-on' : ''}`}>
            <time className="feed__time">{r.time}</time>
            <span className="feed__icon">
              <r.Icon />
            </span>
            <div className="feed__body">
              <strong>{r.agent}</strong>
              <span>{r.text}</span>
              {i === 3 && open && (
                <p className="feed__detail">
                  <Alert style={{ width: 16, height: 16, flex: 'none' }} /> Borrador de seguimiento preparado. No se envía nada sin aprobación de la persona responsable.
                </p>
              )}
            </div>
            {r.tag ? (
              <span className={`badge ${r.tone}`}>{r.tag}</span>
            ) : (
              <button className="btn btn--secondary btn--sm" aria-expanded={open} onClick={() => setOpen(!open)}>
                {open ? 'Ocultar' : 'Revisar movimiento'}
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
