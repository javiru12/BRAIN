'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '@/lib/useInView'
import { ArrowRight, Calendar, Chat, Check, Clock, Doc, Eye, Route, Signal, Users } from '../Icons'

const SOURCES = [
  { label: 'Correo', Icon: Chat },
  { label: 'Calendario', Icon: Calendar },
  { label: 'Reuniones', Icon: Eye },
  { label: 'Llamadas', Icon: Clock },
  { label: 'Documentos', Icon: Doc },
  { label: 'Relaciones', Icon: Users },
  { label: 'Señales', Icon: Signal },
]

const ANSWERS = [
  {
    who: 'Roberto · CFO · Grupo Altamira',
    tag: 'Relación a la baja',
    summary: 'La interacción con esta persona bajó en las últimas semanas.',
    why: ['La renovación se acerca.', 'Participa en la decisión.', 'No existe interacción reciente.'],
    move: 'Pedirle a Mariana una introducción.',
    cta: 'Preparar introducción',
  },
  {
    who: 'Ana · CEO · Del Valle',
    tag: 'Sin respuesta',
    summary: 'Hay un compromiso abierto de tu lado desde hace varias semanas.',
    why: ['Quedó pendiente enviar el resumen técnico.', 'Es la única relación directa con la cuenta.', 'No hay otra persona con contacto.'],
    move: 'Enviar el resumen técnico con un motivo concreto.',
    cta: 'Preparar mensaje',
  },
  {
    who: 'Carlos · Dir. Operaciones · Andén',
    tag: 'Nueva señal',
    summary: 'Apareció una posible ampliación hacia otra unidad de negocio.',
    why: ['Mencionó un proceso nuevo en la última reunión.', 'Todavía no hay propuesta preparada.', 'El interés puede enfriarse sin seguimiento.'],
    move: 'Preparar una reunión de trabajo sobre ese proceso.',
    cta: 'Preparar reunión',
  },
  {
    who: 'Mariana · Dir. Comercial · Grupo Bajío',
    tag: 'Relación fuerte',
    summary: 'Es la mejor vía para abrir otras cuentas conectadas.',
    why: ['Mantiene contacto frecuente con tu equipo.', 'Conoce a dos personas clave de otra cuenta.', 'Respondió a la última propuesta.'],
    move: 'Pedirle que te presente a esas dos personas.',
    cta: 'Preparar petición',
  },
]

/** Pregunta, fuentes que convergen y respuesta accionable. Ejemplo ilustrativo con datos ficticios. */
export default function AskLazo() {
  const { ref, seen } = useInView<HTMLDivElement>(0.35)
  const [phase, setPhase] = useState<'idle' | 'searching' | 'answer'>('idle')
  const [run, setRun] = useState(0)
  const [idx, setIdx] = useState(0)
  const [note, setNote] = useState(false)

  useEffect(() => {
    if (!seen) return
    setNote(false)
    if (prefersReducedMotion()) {
      setPhase('answer')
      return
    }
    setPhase('searching')
    const t = window.setTimeout(() => setPhase('answer'), 2400)
    return () => clearTimeout(t)
  }, [seen, run])

  const a = ANSWERS[idx]
  const go = (d: number) => {
    setIdx((idx + d + ANSWERS.length) % ANSWERS.length)
    setNote(false)
  }

  return (
    <div ref={ref} className={`ask ask--${phase}`}>
      <div className="ask__q">
        <p className="eyebrow">Tu negocio, en contexto</p>
        <h2 style={{ color: 'var(--accent)' }}>Pregúntale a LAZO.</h2>
        <p className="lead" style={{ margin: '14px 0 22px' }}>
          Entiende el contexto completo y convierte respuestas en acciones. No solo información: movimientos.
        </p>
        <button className="ask__input" onClick={() => setRun(run + 1)} aria-label="Hacer la pregunta de ejemplo">
          <span>¿Qué necesita mi atención esta semana?</span>
          <i>
            <ArrowRight />
          </i>
        </button>
        <p className="small muted" style={{ marginTop: 10 }}>
          Ejemplo ilustrativo · datos ficticios
        </p>
      </div>

      <div className="ask__flow" aria-hidden="true">
        <ul className="ask__chips">
          {SOURCES.map((s, i) => (
            <li key={s.label} style={{ ['--i' as string]: i }}>
              <s.Icon />
              {s.label}
            </li>
          ))}
        </ul>
        <svg className="ask__lines" viewBox="0 0 100 380" preserveAspectRatio="none">
          {SOURCES.map((_, i) => {
            const y = 22 + i * 56
            return <path key={i} d={`M0,${y} C55,${y} 45,190 100,190`} style={{ ['--i' as string]: i }} />
          })}
        </svg>
        <div className="ask__node">
          <img src="/brand/brain-icon.png" alt="" width={44} height={42} />
        </div>
      </div>

      <div className="ask__a">
        <div className="ask__card" aria-live="polite">
          {phase !== 'answer' ? (
            <p className="ask__wait">{phase === 'idle' ? 'Haz la pregunta para ver la respuesta.' : 'Consultando fuentes y relaciones…'}</p>
          ) : (
            <div key={idx} className="needs__detail">
              <p className="ask__lead">Encontré 4 relaciones prioritarias.</p>
              <div className="ask__who">
                <span className="avatar">{idx + 1}</span>
                <strong>{a.who}</strong>
                <span className={`badge ${idx === 3 ? 'badge--ok' : idx === 2 ? '' : 'badge--warn'}`}>{a.tag}</span>
              </div>
              <p className="muted small" style={{ margin: '8px 0 14px' }}>
                {a.summary}
              </p>
              <p className="ask__k">Por qué importa</p>
              <ul className="ask__why">
                {a.why.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p className="ask__k">Movimiento recomendado</p>
              <p style={{ fontWeight: 600, color: 'var(--text)' }}>{a.move}</p>
              <button className="btn btn--primary btn--sm" style={{ marginTop: 14 }} onClick={() => setNote(!note)} aria-expanded={note}>
                {a.cta} <ArrowRight />
              </button>
              {note && (
                <p className="feed__detail" style={{ marginTop: 12 }}>
                  <Check style={{ width: 16, height: 16, flex: 'none' }} /> Se prepararía un borrador para tu revisión. En esta demostración no se envía nada.
                </p>
              )}
            </div>
          )}
        </div>
        {phase === 'answer' && (
          <div className="ask__nav">
            <button onClick={() => go(-1)} aria-label="Relación anterior">
              <ArrowRight style={{ transform: 'rotate(180deg)' }} />
            </button>
            <span role="group" aria-label="Relaciones">
              {ANSWERS.map((_, i) => (
                <i key={i} className={i === idx ? 'is-on' : undefined} />
              ))}
            </span>
            <button onClick={() => go(1)} aria-label="Relación siguiente">
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
