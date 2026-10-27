'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '@/lib/useInView'
import { Check, Refresh, Target } from '../Icons'

const GOAL = 'Cerrar Grupo Altamira este trimestre'
const STEPS = ['Analiza la cuenta', 'Encuentra los huecos de información', 'Arma el plan', 'Calcula el camino hacia quien decide', 'Prepara el primer movimiento']

/** Escribir un objetivo y ver cómo LAZO lo descompone. Ejemplo ilustrativo; no ejecuta nada. */
export default function ObjectiveDemo() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const [run, setRun] = useState(0)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setTyped(GOAL)
      setDone(STEPS.length)
      return
    }
    setTyped('')
    setDone(0)
    let alive = true
    const timers: number[] = []
    let i = 0
    const type = () => {
      if (!alive) return
      i++
      setTyped(GOAL.slice(0, i))
      if (i < GOAL.length) timers.push(window.setTimeout(type, 38))
      else STEPS.forEach((_, k) => timers.push(window.setTimeout(() => alive && setDone(k + 1), 600 + k * 650)))
    }
    timers.push(window.setTimeout(type, 400))
    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [seen, run])

  const finished = done === STEPS.length
  return (
    <div ref={ref} className="panel" aria-live="polite">
      <div className="panel__head">
        Objetivo <span className="badge">Ejemplo ilustrativo</span>
      </div>
      <div className="panel__body">
        <div className="obj__input">
          <Target />
          <span>
            {typed}
            {!finished && <i className="hm__typing" aria-hidden="true" />}
          </span>
        </div>
        <ol className="obj__steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i < done ? 'is-on' : undefined}>
              <span className="obj__tick">
                <Check />
              </span>
              {s}
            </li>
          ))}
        </ol>
        <div className="obj__foot">
          <span className={`badge ${finished ? 'badge--warn' : 'badge--neutral'}`}>{finished ? 'Movimiento listo para tu revisión' : 'Trabajando…'}</span>
          <button className="hm__ctrl" onClick={() => setRun(run + 1)}>
            <Refresh /> Repetir
          </button>
        </div>
      </div>
    </div>
  )
}
