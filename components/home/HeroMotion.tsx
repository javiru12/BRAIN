'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, Chat, Check, Database, Doc, Pause, Play, Sparkle, Users, Target, FileCheck } from '../Icons'

const STAGES = [
  { id: 'contexto', num: '01', label: 'Contexto' },
  { id: 'propuesta', num: '02', label: 'Propuesta' },
  { id: 'revision', num: '03', label: 'Revisión' },
] as const

const DUR = 4200

export default function HeroMotion() {
  const [stage, setStage] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [cycle, setCycle] = useState(0)
  const hover = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const t = setTimeout(() => {
      setStage((s) => (s + 1) % STAGES.length)
      setCycle((c) => c + 1)
    }, DUR)
    return () => clearTimeout(t)
  }, [stage, paused, reduced, cycle])

  const auto = !paused && !reduced

  return (
    <div
      className={`hm${auto ? '' : ' is-paused'}`}
      style={{ ['--hm-dur' as string]: `${DUR}ms` }}
      onMouseEnter={() => {
        hover.current = true
      }}
      onMouseLeave={() => {
        hover.current = false
      }}
    >
      <div className="hm__panel" aria-live="polite">
        <div className="hm__head">
          <strong>Un proyecto, en movimiento</strong>
          <span className="badge badge--neutral">Recorrido ilustrativo</span>
        </div>

        <div className="hm__stages" role="tablist" aria-label="Etapas del recorrido">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={stage === i}
              aria-controls={`hm-scene-${s.id}`}
              className={`hm__stage${i < stage ? ' is-done' : ''}`}
              onClick={() => {
                setStage(i)
                setCycle((c) => c + 1)
              }}
            >
              <span>{s.num}</span>
              <strong>{s.label}</strong>
              <span className="hm__bar" aria-hidden="true">
                <i key={`${i}-${cycle}`} />
              </span>
            </button>
          ))}
        </div>

        <div className="hm__view">
          {stage === 0 && (
            <div className="hm__scene" id="hm-scene-contexto" role="tabpanel" key={`c-${cycle}`}>
              <div className="hm__scene-title">Reunir el contexto autorizado</div>
              <div className="hm__scene-sub">La solución consulta solo las fuentes que la organización ha definido.</div>
              <div className="hm__sources">
                {[
                  { Icon: Chat, label: 'Conversaciones recientes', tag: '3 hilos' },
                  { Icon: Doc, label: 'Documentos del proyecto', tag: '5 archivos' },
                  { Icon: Database, label: 'Sistemas internos', tag: 'Lectura' },
                  { Icon: Users, label: 'Personas clave', tag: '4 roles' },
                ].map((s, i) => (
                  <div className="hm__source" style={{ ['--i' as string]: i }} key={s.label}>
                    <s.Icon />
                    {s.label}
                    <span className="badge badge--neutral">{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === 1 && (
            <div className="hm__scene" id="hm-scene-propuesta" role="tabpanel" key={`p-${cycle}`}>
              <div className="hm__scene-title">Preparar una propuesta</div>
              <div className="hm__scene-sub">Con el contexto reunido, se propone un siguiente paso concreto y argumentado.</div>
              <div className="hm__proposal">
                {[
                  { Icon: Target, t: 'Objetivo', d: 'Avanzar la propuesta técnica con el equipo de tecnología.' },
                  { Icon: Sparkle, t: 'Siguiente paso sugerido', d: 'Preparar reunión de alineación: requisitos de integración y calendario.' },
                  { Icon: Calendar, t: 'Material a reunir', d: 'Argumentos, datos clave y posibles preguntas del equipo.' },
                ].map((r, i) => (
                  <div className="hm__proposal-row" style={{ ['--i' as string]: i }} key={r.t}>
                    <r.Icon />
                    <div>
                      <strong>{r.t}</strong>
                      <span>
                        {r.d}
                        {i === 2 && !reduced && <i className="hm__typing" aria-hidden="true" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="hm__scene" id="hm-scene-revision" role="tabpanel" key={`r-${cycle}`}>
              <div className="hm__scene-title">Revisar antes de actuar</div>
              <div className="hm__scene-sub">Una persona revisa, ajusta o aprueba. La decisión y su contexto quedan registrados.</div>
              <div className="hm__review">
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.9rem' }}>Preparar reunión con el equipo</strong>
                  <span className="badge badge--warn">Pendiente de revisión</span>
                </div>
                <p className="small muted" style={{ marginTop: 6 }}>
                  Propuesta generada a partir de 3 conversaciones y 5 documentos. Sin acciones externas hasta su aprobación.
                </p>
                <div className="hm__review-actions">
                  <span className="btn btn--secondary btn--sm" aria-hidden="true">
                    Ver contexto
                  </span>
                  <span className="btn btn--primary btn--sm" aria-hidden="true">
                    Aprobar propuesta
                  </span>
                </div>
                <div className="hm__check">
                  <Check />
                  Aprobada y registrada con su justificación
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="hm__foot">
          <span>
            <FileCheck style={{ display: 'inline', width: 14, height: 14, verticalAlign: '-2px', marginRight: 6 }} />
            Datos ficticios. No representa una empresa real.
          </span>
          {!reduced && (
            <button className="hm__ctrl" onClick={() => setPaused(!paused)} aria-pressed={paused}>
              {paused ? <Play /> : <Pause />}
              {paused ? 'Reanudar' : 'Pausar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
