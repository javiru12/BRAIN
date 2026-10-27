'use client'

import { useState } from 'react'
import { ArrowRight, Alert, Check, Database, Doc, Lock, Target, Wrench, Users, Refresh } from './Icons'

const STEPS = [
  {
    id: 'objetivo',
    label: 'Objetivo',
    title: 'Recibe un objetivo concreto',
    text: 'El agente parte de una tarea con un resultado esperado, no de una instrucción vaga. Ejemplo: «Prepara la respuesta a la solicitud de información del cliente Horizonte sobre plazos de entrega».',
    view: (
      <div className="card card--surface">
        <span className="badge" style={{ marginBottom: 10 }}>
          Objetivo
        </span>
        <p style={{ fontWeight: 500, color: 'var(--text)' }}>Preparar la respuesta a la solicitud de información sobre plazos de entrega.</p>
        <dl className="kv" style={{ marginTop: 12 }}>
          <dt>Solicitado por</dt>
          <dd>Responsable de cuenta</dd>
          <dt>Resultado esperado</dt>
          <dd>Borrador de respuesta para revisión</dd>
        </dl>
      </div>
    ),
  },
  {
    id: 'contexto',
    label: 'Contexto autorizado',
    title: 'Consulta solo lo que tiene permiso de consultar',
    text: 'Antes de proponer nada, el agente reúne contexto de las fuentes autorizadas para esa tarea: la conversación con el cliente, las condiciones acordadas y los datos de planificación. Fuera de ese perímetro no accede.',
    view: (
      <div className="list-rows">
        <div>
          <Doc /> Hilo de correo con el cliente <span className="badge badge--ok" style={{ marginLeft: 'auto' }}>Autorizado</span>
        </div>
        <div>
          <Database /> Planificación de entregas <span className="badge badge--ok" style={{ marginLeft: 'auto' }}>Lectura</span>
        </div>
        <div>
          <Doc /> Condiciones del contrato <span className="badge badge--ok" style={{ marginLeft: 'auto' }}>Autorizado</span>
        </div>
        <div style={{ opacity: 0.6 }}>
          <Lock /> Datos de facturación <span className="badge badge--neutral" style={{ marginLeft: 'auto' }}>Sin acceso</span>
        </div>
      </div>
    ),
  },
  {
    id: 'plan',
    label: 'Plan',
    title: 'Propone un plan antes de actuar',
    text: 'Con el contexto reunido, el agente descompone la tarea en pasos y los hace visibles. Si una parte del plan requiere una herramienta o una aprobación, queda señalado desde el principio.',
    view: (
      <ol className="list-rows" style={{ counterReset: 'p' }}>
        {['Identificar qué plazos pregunta el cliente', 'Contrastar con la planificación vigente', 'Redactar respuesta con las fechas y condiciones', 'Enviar a revisión del responsable de cuenta'].map((s, i) => (
          <li key={s}>
            <span className="avatar" style={{ width: 26, height: 26, fontSize: '0.7rem' }}>
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    title: 'Usa herramientas definidas, con límites',
    text: 'Cada herramienta es una acción concreta: leer la planificación, preparar un borrador, registrar una nota. Las acciones con efecto hacia fuera (enviar, modificar, comprometer) requieren aprobación.',
    view: (
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Herramienta</th>
              <th>Efecto</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Leer planificación</td>
              <td>Solo lectura</td>
              <td>
                <span className="badge badge--ok">Automático</span>
              </td>
            </tr>
            <tr>
              <td>Preparar borrador</td>
              <td>Interno</td>
              <td>
                <span className="badge badge--ok">Automático</span>
              </td>
            </tr>
            <tr>
              <td>Enviar al cliente</td>
              <td>Externo</td>
              <td>
                <span className="badge badge--warn">Con aprobación</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'revision',
    label: 'Revisión',
    title: 'Una persona revisa lo que importa',
    text: 'El borrador llega con su justificación: qué fuentes se usaron y qué supuestos se hicieron. La persona puede aprobar, ajustar o rechazar. Si falta información, el agente lo dice en lugar de rellenarlo.',
    view: (
      <div className="card" style={{ padding: 18 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <strong>Borrador de respuesta</strong>
          <span className="badge badge--warn">Pendiente de revisión</span>
        </div>
        <p className="small muted" style={{ marginTop: 8 }}>
          Basado en: hilo de correo (2 mensajes), planificación vigente, condiciones del contrato (cláusula de plazos).
        </p>
        <div className="notice notice--warn" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Alert style={{ width: 18, height: 18, flex: 'none' }} />
          <span>
            <strong>Información pendiente:</strong> no consta la fecha de confirmación del pedido. Se ha dejado indicada en el borrador.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'resultado',
    label: 'Resultado',
    title: 'Un resultado registrado y evaluable',
    text: 'La respuesta aprobada se entrega. Queda registro de la decisión, de las fuentes y de la intervención humana. Ese registro sirve para evaluar el comportamiento del agente y mejorarlo con evidencia.',
    view: (
      <div className="timeline">
        {[
          ['Objetivo recibido', 'Responsable de cuenta'],
          ['Contexto consultado', '3 fuentes autorizadas'],
          ['Borrador preparado', 'Con 1 dato pendiente señalado'],
          ['Revisado y ajustado', 'Responsable de cuenta'],
          ['Enviado y registrado', 'Trazabilidad completa'],
        ].map(([t, d]) => (
          <div className="timeline__item" key={t}>
            <span className="timeline__dot">
              <Check />
            </span>
            <div>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

const ICONS = [Target, Database, Doc, Wrench, Users, Check]

export default function AgentJourney() {
  const [i, setI] = useState(0)
  const cur = STEPS[i]
  return (
    <div className="journey">
      <div className="journey__rail" role="group" aria-label="Pasos del recorrido">
        {STEPS.map((s, k) => {
          const I = ICONS[k]
          return (
            <button key={s.id} aria-current={k === i ? 'step' : undefined} className={k < i ? 'is-done' : undefined} onClick={() => setI(k)}>
              <i>{k < i ? <Check style={{ width: 14, height: 14 }} /> : k + 1}</i>
              <I style={{ width: 18, height: 18, flex: 'none' }} />
              {s.label}
            </button>
          )
        })}
      </div>
      <div>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="badge badge--neutral">Recorrido ilustrativo · paso {i + 1} de {STEPS.length}</span>
        </div>
        <div key={cur.id} className="needs__detail" aria-live="polite">
          <h3>{cur.title}</h3>
          <p className="muted" style={{ margin: '8px 0 20px', maxWidth: '62ch' }}>
            {cur.text}
          </p>
          {cur.view}
        </div>
        <div className="flow__controls">
          <button className="btn btn--secondary btn--sm" onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={{ opacity: i === 0 ? 0.5 : 1 }}>
            Anterior
          </button>
          {i < STEPS.length - 1 ? (
            <button className="btn btn--primary btn--sm" onClick={() => setI(i + 1)}>
              Siguiente <ArrowRight />
            </button>
          ) : (
            <button className="btn btn--primary btn--sm" onClick={() => setI(0)}>
              <Refresh /> Volver a empezar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
