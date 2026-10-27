'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion, useInView } from '@/lib/useInView'
import { ArrowRight, Signal } from '../Icons'

const ROWS = [
  ['Roberto García', 'Altamira', 'Negociación'],
  ['Mariana López', 'Bajío', 'Discovery'],
  ['Carlos Ruiz', 'Andén', 'Propuesta'],
  ['Ana Torres', 'Del Valle', 'Negociación'],
  ['Jorge Ramírez', 'Sierra', 'Cierre ganado'],
  ['Sofía Herrera', 'Nexo', 'Prospección'],
]

const initials = (n: string) =>
  n
    .split(' ')
    .map((s) => s[0])
    .join('')

/** Los mismos datos, vistos como relaciones. Ejemplo ilustrativo con datos ficticios. */
export default function CrmToLazo() {
  const { ref, seen } = useInView<HTMLDivElement>(0.4)
  const [view, setView] = useState<'crm' | 'lazo'>('crm')

  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) {
      setView('lazo')
      return
    }
    const t = window.setTimeout(() => setView('lazo'), 1100)
    return () => clearTimeout(t)
  }, [seen])

  return (
    <div ref={ref} className={`c2l c2l--${view}`}>
      <div className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="seg" role="group" aria-label="Vista">
          <button aria-pressed={view === 'crm'} onClick={() => setView('crm')}>
            Tu CRM hoy
          </button>
          <button aria-pressed={view === 'lazo'} onClick={() => setView('lazo')}>
            Con LAZO
          </button>
        </div>
        <span className="badge badge--neutral">Ejemplo ilustrativo · datos ficticios</span>
      </div>

      <div className="c2l__stage">
        <div className="panel c2l__table">
          <div className="panel__head">Tu CRM hoy</div>
          <div className="table-wrap" style={{ border: 0, borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Empresa</th>
                  <th>Etapa</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className="muted">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <span className="c2l__arrow" aria-hidden="true">
          <ArrowRight />
        </span>

        <div className="panel c2l__map" aria-label="Mapa de relaciones con LAZO">
          <div className="panel__head">
            Mapa de relaciones <span className="badge">LAZO</span>
          </div>
          <div className="c2l__canvas">
            <svg viewBox="0 0 500 400" preserveAspectRatio="none" aria-hidden="true">
              <line className="c2l__ln" x1="130" y1="200" x2="170" y2="80" style={{ ['--d' as string]: '0.1s' }} />
              <line className="c2l__ln" x1="130" y1="200" x2="380" y2="192" style={{ ['--d' as string]: '0.25s' }} />
              <line className="c2l__ln c2l__ln--dim" x1="130" y1="200" x2="110" y2="320" style={{ ['--d' as string]: '0.4s' }} />
              <line className="c2l__ln c2l__ln--dim" x1="130" y1="200" x2="270" y2="336" style={{ ['--d' as string]: '0.55s' }} />
              <line className="c2l__ln c2l__ln--warm" x1="380" y1="192" x2="410" y2="96" style={{ ['--d' as string]: '0.9s' }} />
            </svg>
            <div className="c2l__node c2l__node--me" style={{ left: '26%', top: '50%', ['--d' as string]: '0s' }}>
              <span className="avatar c2l__av">Tú</span>
            </div>
            <div className="c2l__node" style={{ left: '34%', top: '20%', ['--d' as string]: '0.2s' }}>
              <span className="avatar c2l__av">ML</span>
              <span className="c2l__lbl">
                <strong>Mariana López</strong>
                <em>Dir. Comercial · Grupo Bajío</em>
                <span className="badge badge--ok">Relación fuerte</span>
              </span>
            </div>
            <div className="c2l__node" style={{ left: '76%', top: '48%', ['--d' as string]: '0.35s' }}>
              <span className="avatar c2l__av">RG</span>
              <span className="c2l__lbl">
                <strong>Roberto García</strong>
                <em>CFO · Grupo Altamira</em>
                <span className="badge badge--warn">En movimiento</span>
              </span>
            </div>
            <div className="c2l__node c2l__node--dim" style={{ left: '22%', top: '80%', ['--d' as string]: '0.5s' }}>
              <span className="avatar c2l__av">CR</span>
              <span className="c2l__lbl">
                <strong>Carlos Ruiz</strong>
                <em>Dir. Operaciones · Andén</em>
              </span>
            </div>
            <div className="c2l__node c2l__node--dim" style={{ left: '54%', top: '84%', ['--d' as string]: '0.65s' }}>
              <span className="avatar c2l__av">AT</span>
              <span className="c2l__lbl">
                <strong>Ana Torres</strong>
                <em>CEO · Del Valle</em>
              </span>
            </div>
            <div className="c2l__signal" style={{ ['--d' as string]: '1.1s' }}>
              <Signal />
              <span>
                <strong>Nueva señal</strong>
                <em>Posible expansión en el sector retail.</em>
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="c2l__cap">Los mismos datos. Una nueva forma de ver el negocio.</p>
    </div>
  )
}
