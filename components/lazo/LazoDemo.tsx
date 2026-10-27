'use client'

import { useState } from 'react'
import { Alert, Calendar, Chat, Check, Doc, Info, Route, Signal, Target, Users } from '../Icons'

/** Demostración ilustrativa con datos ficticios de "Empresa Horizonte". No envía mensajes ni ejecuta acciones. */

type Person = { id: string; name: string; role: string; rel: 'conocido' | 'contacto' | 'sin-contacto'; via?: string }

const PEOPLE: Person[] = [
  { id: 'mc', name: 'María Cano', role: 'Directora general', rel: 'sin-contacto', via: 'lr' },
  { id: 'lr', name: 'Luis Romero', role: 'Director de operaciones', rel: 'conocido' },
  { id: 'ap', name: 'Ana Peña', role: 'Responsable de tecnología', rel: 'contacto' },
  { id: 'js', name: 'Jorge Salas', role: 'Compras', rel: 'sin-contacto', via: 'ap' },
]

const OBJECTIVES = [
  {
    id: 'renovar',
    label: 'Renovar el contrato anual',
    key: ['lr', 'mc'],
    pending: [
      { t: 'Fecha límite de renovación', d: 'No consta en las conversaciones registradas.', critical: true },
      { t: 'Postura de dirección general', d: 'No hay interacción directa con María Cano.', critical: false },
    ],
    plan: ['Confirmar con Luis Romero el calendario de renovación', 'Preparar resumen del valor entregado este año', 'Pedir a Luis una introducción a María Cano', 'Proponer reunión de revisión anual'],
    move: {
      t: 'Pedir a Luis Romero una introducción a María Cano',
      type: 'Borrador para revisión',
      why: ['Luis Romero es el contacto con más interacciones recientes (4 en 30 días) y mantiene relación directa con María Cano.', 'La renovación depende de dirección general y no existe contacto previo con ella.', 'En la última conversación Luis se mostró satisfecho con el soporte recibido.'],
    },
  },
  {
    id: 'ampliar',
    label: 'Ampliar el alcance a operaciones',
    key: ['lr', 'js'],
    pending: [
      { t: 'Presupuesto disponible para ampliación', d: 'No hay información de compras.', critical: true },
      { t: 'Procesos operativos candidatos', d: 'Luis mencionó dos en la reunión del 3 de abril, sin detallar.', critical: false },
    ],
    plan: ['Retomar los dos procesos que mencionó Luis Romero', 'Preparar una propuesta de alcance breve', 'Identificar la ruta hacia Jorge Salas (compras)', 'Agendar sesión de trabajo con operaciones'],
    move: {
      t: 'Preparar reunión de trabajo con Luis Romero sobre los dos procesos pendientes',
      type: 'Preparación de reunión',
      why: ['Existe un compromiso abierto: Luis quedó en detallar los dos procesos y no se ha retomado.', 'Es el siguiente paso con menos fricción: ya hay relación directa y una conversación en curso.', 'Compras intervendrá después; hace falta primero un alcance definido.'],
    },
  },
  {
    id: 'recuperar',
    label: 'Reactivar una cuenta sin actividad',
    key: ['ap'],
    pending: [
      { t: 'Motivo de la pausa', d: 'La última interacción fue hace 70 días y no registra un motivo.', critical: true },
      { t: 'Cambios en el equipo del cliente', d: 'Sin señales recientes.', critical: false },
    ],
    plan: ['Revisar el último compromiso registrado con Ana Peña', 'Preparar un mensaje breve con un motivo concreto para retomar', 'Si no hay respuesta, explorar ruta alternativa por Luis Romero'],
    move: {
      t: 'Redactar mensaje a Ana Peña retomando el compromiso técnico pendiente',
      type: 'Acción con aprobación',
      why: ['Ana Peña es el único contacto con relación directa y el último compromiso quedó abierto en su lado.', 'Un mensaje con un motivo concreto tiene más sentido que un seguimiento genérico.', 'Enviar un mensaje es una acción externa: requiere aprobación de la persona responsable.'],
    },
  },
]

const HISTORY = [
  { Icon: Chat, t: 'Conversación con Luis Romero', d: 'Revisión del soporte del trimestre. Mencionó dos procesos operativos a explorar.' },
  { Icon: Check, t: 'Compromiso', d: 'Enviar resumen de valor entregado antes de fin de mes.' },
  { Icon: Signal, t: 'Señal', d: 'Ana Peña sin actividad desde hace 70 días.' },
]

const TABS = [
  { id: 'personas', label: 'Personas y relaciones', Icon: Users },
  { id: 'pendiente', label: 'Información pendiente', Icon: Alert },
  { id: 'plan', label: 'Plan', Icon: Doc },
  { id: 'movimiento', label: 'Siguiente movimiento', Icon: Route },
] as const

export default function LazoDemo() {
  const [obj, setObj] = useState(OBJECTIVES[0].id)
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('personas')
  const [showWhy, setShowWhy] = useState(false)
  const o = OBJECTIVES.find((x) => x.id === obj)!

  return (
    <div className="panel">
      <div className="panel__head">
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="avatar" style={{ width: 28, height: 28 }}>
            EH
          </span>
          Empresa Horizonte <span className="badge badge--neutral">Cuenta</span>
        </span>
        <span className="badge">Ejemplo ilustrativo</span>
      </div>

      <div className="panel__body" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <label htmlFor="lazo-obj" className="small" style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
          <Target style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
          Objetivo comercial
        </label>
        <div className="seg" role="group" aria-label="Objetivo comercial" id="lazo-obj" style={{ flexWrap: 'wrap' }}>
          {OBJECTIVES.map((x) => (
            <button
              key={x.id}
              aria-pressed={obj === x.id}
              onClick={() => {
                setObj(x.id)
                setShowWhy(false)
              }}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs" style={{ padding: '0 18px' }}>
        <div className="tabs__list" role="tablist" aria-label="Secciones de la cuenta">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} aria-controls={`lazo-panel-${t.id}`} id={`lazo-tab-${t.id}`} className="tabs__tab" onClick={() => setTab(t.id)} tabIndex={tab === t.id ? 0 : -1}>
              <t.Icon />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel__body" role="tabpanel" id={`lazo-panel-${tab}`} aria-labelledby={`lazo-tab-${tab}`} key={`${obj}-${tab}`} style={{ minHeight: 300 }}>
        <div className="needs__detail">
          {tab === 'personas' && (
            <div className="grid grid-2" style={{ gap: 18 }}>
              <div>
                <p className="small" style={{ fontWeight: 600, marginBottom: 10 }}>
                  Mapa de relaciones
                </p>
                <svg viewBox="0 0 320 220" style={{ width: '100%', height: 'auto', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }} role="img" aria-label="Mapa de relaciones de Empresa Horizonte">
                  <g stroke="#cbd5e1" strokeWidth="1.2">
                    <line x1="60" y1="110" x2="160" y2="60" />
                    <line x1="60" y1="110" x2="160" y2="160" />
                    <line x1="160" y1="60" x2="260" y2="60" strokeDasharray="4 4" />
                    <line x1="160" y1="160" x2="260" y2="160" strokeDasharray="4 4" />
                  </g>
                  {[
                    { x: 60, y: 110, l: 'Tú', hi: true },
                    { x: 160, y: 60, l: 'Luis R.', hi: o.key.includes('lr') },
                    { x: 160, y: 160, l: 'Ana P.', hi: o.key.includes('ap') },
                    { x: 260, y: 60, l: 'María C.', hi: o.key.includes('mc') },
                    { x: 260, y: 160, l: 'Jorge S.', hi: o.key.includes('js') },
                  ].map((n) => (
                    <g key={n.l}>
                      <circle cx={n.x} cy={n.y} r="18" fill={n.hi ? '#426B83' : '#fff'} stroke="#426B83" strokeWidth="1.5" />
                      <text x={n.x} y={n.y + 34} textAnchor="middle" fontSize="11" fill="#111827" fontWeight={n.hi ? 700 : 500}>
                        {n.l}
                      </text>
                    </g>
                  ))}
                </svg>
                <p className="small muted" style={{ marginTop: 8 }}>
                  Resaltadas: personas relevantes para el objetivo seleccionado. Línea discontinua: ruta de introducción posible.
                </p>
              </div>
              <div className="list-rows">
                {PEOPLE.map((p) => (
                  <div key={p.id} style={{ alignItems: 'flex-start' }}>
                    <span className="avatar">
                      {p.name
                        .split(' ')
                        .map((s) => s[0])
                        .join('')}
                    </span>
                    <span style={{ flex: 1 }}>
                      <strong style={{ display: 'block' }}>{p.name}</strong>
                      <span className="muted small">{p.role}</span>
                      {p.rel === 'sin-contacto' && p.via && (
                        <span className="small" style={{ display: 'block', color: 'var(--accent)' }}>
                          Ruta: vía {PEOPLE.find((q) => q.id === p.via)?.name}
                        </span>
                      )}
                    </span>
                    <span className={`badge ${p.rel === 'conocido' ? 'badge--ok' : p.rel === 'contacto' ? '' : 'badge--neutral'}`}>
                      {p.rel === 'conocido' ? 'Relación activa' : p.rel === 'contacto' ? 'Contacto' : 'Sin contacto'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'pendiente' && (
            <div className="grid grid-2" style={{ gap: 18 }}>
              <div className="stack">
                <p className="small" style={{ fontWeight: 600 }}>
                  Lo que falta para avanzar en «{o.label}»
                </p>
                {o.pending.map((p) => (
                  <div key={p.t} className={`notice${p.critical ? ' notice--warn' : ''}`} style={{ display: 'flex', gap: 10 }}>
                    {p.critical ? <Alert style={{ width: 18, height: 18, flex: 'none' }} /> : <Info style={{ width: 18, height: 18, flex: 'none' }} />}
                    <span>
                      <strong>{p.t}.</strong> {p.d}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="small" style={{ fontWeight: 600, marginBottom: 10 }}>
                  Memoria reciente de la cuenta
                </p>
                <div className="timeline">
                  {HISTORY.map((h) => (
                    <div className="timeline__item" key={h.t}>
                      <span className="timeline__dot">
                        <h.Icon />
                      </span>
                      <div>
                        <strong>{h.t}</strong>
                        <span>{h.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'plan' && (
            <div>
              <p className="small" style={{ fontWeight: 600, marginBottom: 10 }}>
                Plan propuesto para «{o.label}»
              </p>
              <ol className="list-rows">
                {o.plan.map((s, i) => (
                  <li key={s}>
                    <span className="avatar" style={{ width: 26, height: 26, fontSize: '0.7rem' }}>
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="small muted" style={{ marginTop: 12 }}>
                El plan se construye a partir del objetivo, de las personas relevantes y de la información pendiente. La persona responsable puede reordenarlo o descartar pasos.
              </p>
            </div>
          )}

          {tab === 'movimiento' && (
            <div>
              <div className="card card--surface" style={{ padding: 20 }}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="badge">{o.move.type}</span>
                  <span className="badge badge--warn">Pendiente de revisión</span>
                </div>
                <h4 style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Calendar style={{ width: 20, height: 20, color: 'var(--accent)', flex: 'none', marginTop: 2 }} />
                  {o.move.t}
                </h4>
                <div className="row" style={{ marginTop: 16 }}>
                  <button className="btn btn--secondary btn--sm" aria-expanded={showWhy} aria-controls="lazo-why" onClick={() => setShowWhy(!showWhy)}>
                    {showWhy ? 'Ocultar justificación' : '¿Por qué se propone?'}
                  </button>
                  <span className="small muted">En esta demostración no se envía ni ejecuta nada.</span>
                </div>
                {showWhy && (
                  <ul id="lazo-why" className="stack" style={{ marginTop: 14, gap: 8 }}>
                    {o.move.why.map((w) => (
                      <li key={w} className="small" style={{ display: 'flex', gap: 8 }}>
                        <Check style={{ width: 16, height: 16, color: 'var(--accent)', flex: 'none', marginTop: 3 }} />
                        {w}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
