'use client'

import { useState } from 'react'
import { Bot, Check, Eye, Plug, Shield, Users } from '../Icons'

/** Auditoría ilustrativa: actividad de personas (Faro) y de agentes (Riel) bajo reglas. Datos ficticios; no es un motor real. */

type Tone = 'ok' | 'warn' | 'danger' | ''
type Outcome = { label: string; tone: Tone }
type Row = { id: string; time: string; who: string; sub: string; tool: string; prompt: (masked: boolean) => string; outcome: (on: Record<string, boolean>) => Outcome; agent?: string }

const PEOPLE_RULES = [
  { id: 'mask', label: 'Enmascarar datos personales', hint: 'Oculta nombres, identificadores y datos de contacto en lo registrado.' },
  { id: 'block', label: 'Bloquear herramientas no aprobadas', hint: 'Solo se permiten herramientas del catálogo aprobado.' },
  { id: 'flag', label: 'Marcar contenido confidencial', hint: 'Envía a revisión los usos con documentos internos sensibles.' },
]
const AGENT_RULES = [
  { id: 'approve', label: 'Acciones externas con aprobación', hint: 'Cualquier envío fuera de la organización espera a una persona.' },
  { id: 'billing', label: 'Sin acceso a datos de facturación', hint: 'Los agentes no pueden leer esos sistemas.' },
  { id: 'limit', label: 'Límite de gasto por agente', hint: 'Se detiene el uso al superar el tope definido.' },
]

const PEOPLE_ROWS: Row[] = [
  { id: 'p1', time: '09:12', who: 'Laura M.', sub: 'Ventas', tool: 'Asistente de redacción', prompt: () => 'Redacta un correo de seguimiento para el cliente tras la reunión de ayer.', outcome: () => ({ label: 'Registrado', tone: 'ok' }) },
  {
    id: 'p2',
    time: '09:15',
    who: 'Diego R.',
    sub: 'Finanzas',
    tool: 'Asistente de redacción',
    prompt: (m) => (m ? 'Resume este contrato de ••••• ••••• con identificador •••••••••.' : 'Resume este contrato de Juan Pérez con RFC PEJJ800101XXX.'),
    outcome: (on) => (on.mask ? { label: 'Datos personales ocultados', tone: 'ok' } : { label: 'Datos personales expuestos', tone: 'danger' }),
  },
  { id: 'p3', time: '09:21', who: 'Ana P.', sub: 'Operaciones', tool: 'Herramienta no aprobada', prompt: () => 'Analiza esta lista de proveedores y propón recortes.', outcome: (on) => (on.block ? { label: 'Bloqueado', tone: 'ok' } : { label: 'Sin aprobación previa', tone: 'warn' }) },
  { id: 'p4', time: '09:27', who: 'Marcos T.', sub: 'RR. HH.', tool: 'Traductor con IA', prompt: () => 'Traduce esta política interna de compensaciones al inglés.', outcome: (on) => (on.flag ? { label: 'Enviado a revisión', tone: 'warn' } : { label: 'Registrado', tone: 'ok' }) },
]

const AGENTS = ['Agente comercial', 'Asistente de soporte', 'Flujo operativo']
const AGENT_ROWS: Row[] = [
  { id: 'a1', time: '10:02', who: 'Agente comercial', sub: 'Envío de correo', tool: 'Herramienta: correo', agent: AGENTS[0], prompt: () => 'Enviar propuesta con condiciones económicas a un cliente externo.', outcome: (on) => (on.approve ? { label: 'En espera de aprobación', tone: 'warn' } : { label: 'Ejecutada sin revisión', tone: 'danger' }) },
  { id: 'a2', time: '10:05', who: 'Asistente de soporte', sub: 'Consulta', tool: 'Herramienta: facturación', agent: AGENTS[1], prompt: () => 'Leer el historial de facturación de un cliente para responder una duda.', outcome: (on) => (on.billing ? { label: 'Denegada por política', tone: 'ok' } : { label: 'Permitida', tone: 'warn' }) },
  { id: 'a3', time: '10:09', who: 'Flujo operativo', sub: 'Generación', tool: 'Modelo de lenguaje', agent: AGENTS[2], prompt: () => 'Generar el resumen operativo del día con las incidencias abiertas.', outcome: () => ({ label: 'Permitida', tone: 'ok' }) },
  { id: 'a4', time: '10:14', who: 'Agente comercial', sub: 'Generación', tool: 'Modelo de lenguaje', agent: AGENTS[0], prompt: () => 'Reescribir la propuesta completa con tres variantes y análisis comparativo.', outcome: (on) => (on.limit ? { label: 'Límite de gasto alcanzado', tone: 'warn' } : { label: 'Permitida', tone: 'ok' }) },
]

const toneClass = (t: Tone) => (t ? ` badge--${t}` : '')

export default function NodraAudit() {
  const [tab, setTab] = useState<'personas' | 'agentes'>('personas')
  const [rules, setRules] = useState<Record<string, boolean>>({ mask: false, block: false, flag: false, approve: false, billing: false, limit: false })
  const [connected, setConnected] = useState<Record<string, boolean>>({ [AGENTS[0]]: true, [AGENTS[1]]: true, [AGENTS[2]]: false })
  const [filter, setFilter] = useState<'todo' | 'atencion'>('todo')

  const isPeople = tab === 'personas'
  const ruleSet = isPeople ? PEOPLE_RULES : AGENT_RULES
  const baseRows = isPeople ? PEOPLE_ROWS : AGENT_ROWS.filter((r) => connected[r.agent!])
  const rows = baseRows.map((r) => ({ r, o: r.outcome(rules) }))
  const attention = rows.filter((x) => x.o.tone === 'danger' || x.o.tone === 'warn')
  const shown = filter === 'atencion' ? attention : rows
  const controlled = rows.filter((x) => x.o.tone === 'ok').length
  const masked = rules.mask

  return (
    <div className="panel">
      <div className="panel__head">
        Auditoría de actividad <span className="badge">Ejemplo ilustrativo · datos ficticios</span>
      </div>

      <div className="audit__tabs" role="tablist" aria-label="Qué se audita">
        <button role="tab" aria-selected={isPeople} onClick={() => setTab('personas')} className="tabs__tab">
          <Users /> Personas · Faro
        </button>
        <button role="tab" aria-selected={!isPeople} onClick={() => setTab('agentes')} className="tabs__tab">
          <Bot /> Agentes · Riel
        </button>
      </div>

      {!isPeople && (
        <div className="audit__connect">
          <span className="small" style={{ fontWeight: 600 }}>
            <Plug style={{ width: 16, height: 16, display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
            Agentes que ya viven en tu organización
          </span>
          <div className="row">
            {AGENTS.map((a) => (
              <button key={a} className={`audit__agent${connected[a] ? ' is-on' : ''}`} aria-pressed={connected[a]} onClick={() => setConnected({ ...connected, [a]: !connected[a] })}>
                <i aria-hidden="true" />
                {a}
                <span>{connected[a] ? 'Conectado a Nodra' : 'Conectar'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="audit__body">
        <div className="audit__rules">
          <p className="audit__k">
            <Shield style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Reglas de la organización
          </p>
          {ruleSet.map((r) => (
            <label key={r.id} className="audit__rule">
              <span>
                <strong>{r.label}</strong>
                <em>{r.hint}</em>
              </span>
              <input type="checkbox" role="switch" checked={rules[r.id]} onChange={(e) => setRules({ ...rules, [r.id]: e.target.checked })} />
              <i aria-hidden="true" />
            </label>
          ))}
          <p className="small muted" style={{ marginTop: 10 }}>
            Activa y desactiva reglas para ver cómo cambia el resultado de cada evento.
          </p>
        </div>

        <div className="audit__log">
          <div className="audit__stats">
            <span>
              <strong>{rows.length}</strong> eventos registrados
            </span>
            <span>
              <strong>{controlled}</strong> con control
            </span>
            <span className={attention.length ? 'is-alert' : undefined}>
              <strong>{attention.length}</strong> requieren atención
            </span>
            <div className="seg" role="group" aria-label="Filtro" style={{ marginLeft: 'auto' }}>
              <button aria-pressed={filter === 'todo'} onClick={() => setFilter('todo')}>
                Todo
              </button>
              <button aria-pressed={filter === 'atencion'} onClick={() => setFilter('atencion')}>
                Atención
              </button>
            </div>
          </div>

          <ul className="audit__rows" aria-live="polite">
            {shown.length === 0 && <li className="audit__empty">{rows.length === 0 ? 'Conecta un agente para empezar a ver su actividad.' : 'Nada requiere atención con las reglas actuales.'}</li>}
            {shown.map(({ r, o }) => (
              <li key={`${tab}-${r.id}`} className="audit__row">
                <span className="audit__time">{r.time}</span>
                <span className="audit__who">
                  <strong>{r.who}</strong>
                  <em>{r.sub}</em>
                </span>
                <span className="audit__prompt">
                  <span className="audit__tool">{r.tool}</span>
                  <q className={isPeople && masked && r.id === 'p2' ? 'is-masked' : undefined}>{r.prompt(masked)}</q>
                </span>
                <span className={`badge${toneClass(o.tone)}`}>{o.label}</span>
              </li>
            ))}
          </ul>
          <p className="small muted" style={{ padding: '10px 16px 14px' }}>
            <Eye style={{ width: 14, height: 14, display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
            Qué se registra y quién puede ver cada contenido se define en el proyecto. Esta demostración no es un motor real de protección.
          </p>
        </div>
      </div>
    </div>
  )
}
