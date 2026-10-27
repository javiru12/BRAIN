'use client'

import { useState } from 'react'
import { ArrowRight, Check, Doc, Refresh, Shield, Users } from '../Icons'

const STEPS = ['Acción propuesta', 'Política aplicable', 'Revisión necesaria', 'Decisión', 'Registro']

const CASES = {
  permitida: {
    label: 'Acción permitida',
    action: { t: 'Resumir un documento interno', agent: 'Asistente de conocimiento', tool: 'Lectura de documentos', target: 'Repositorio interno', data: 'Documento de uso interno, sin datos personales' },
    policy: { name: 'Lectura de documentación interna', rule: 'Los agentes de conocimiento pueden leer documentos de uso interno sin aprobación previa.', result: 'Cumple' },
    review: { needed: false, text: 'La política no requiere revisión humana para esta acción: lectura, alcance interno y sin datos sensibles.' },
    decision: { t: 'Permitida automáticamente', badge: 'ok' as const },
    log: ['Acción: resumir documento', 'Política aplicada: lectura de documentación interna', 'Decisión: permitida (automática)', 'Coste del modelo registrado'],
  },
  revision: {
    label: 'Acción que necesita revisión',
    action: { t: 'Enviar propuesta a un cliente externo', agent: 'Agente comercial', tool: 'Envío de correo', target: 'Cliente externo', data: 'Propuesta con condiciones económicas' },
    policy: { name: 'Comunicaciones externas', rule: 'Cualquier envío a destinatarios externos con condiciones económicas requiere aprobación del responsable.', result: 'Requiere aprobación' },
    review: { needed: true, text: 'La acción queda en espera. El responsable comercial recibe el contexto completo: qué se va a enviar, a quién y por qué el agente lo propone.' },
    decision: { t: 'Aprobada por el responsable tras revisar', badge: 'warn' as const },
    log: ['Acción: enviar propuesta', 'Política aplicada: comunicaciones externas', 'Revisión: responsable comercial', 'Decisión: aprobada con ajuste', 'Registro de la versión enviada'],
  },
}

export default function NodraFlow() {
  const [c, setC] = useState<keyof typeof CASES>('permitida')
  const [i, setI] = useState(0)
  const k = CASES[c]

  return (
    <div className="flow">
      <div>
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
          <div className="seg" role="group" aria-label="Tipo de acción">
            {(Object.keys(CASES) as (keyof typeof CASES)[]).map((key) => (
              <button
                key={key}
                aria-pressed={c === key}
                onClick={() => {
                  setC(key)
                  setI(0)
                }}
              >
                {CASES[key].label}
              </button>
            ))}
          </div>
          <span className="badge badge--neutral">Recorrido ilustrativo</span>
        </div>
        <div className="flow__steps">
          {STEPS.map((s, k2) => (
            <button key={s} className={`flow__step${k2 < i ? ' is-done' : ''}`} aria-current={k2 === i ? 'step' : undefined} onClick={() => setI(k2)}>
              <i>{k2 < i ? <Check style={{ width: 14, height: 14 }} /> : k2 + 1}</i>
              <span>
                <strong>{s}</strong>
                <span>
                  {k2 === 0 && 'Un agente propone una acción.'}
                  {k2 === 1 && 'Se evalúan las reglas que aplican.'}
                  {k2 === 2 && '¿Hace falta que una persona revise?'}
                  {k2 === 3 && 'Se permite, ajusta o rechaza.'}
                  {k2 === 4 && 'Queda un registro trazable.'}
                </span>
              </span>
            </button>
          ))}
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
              <Refresh /> Reiniciar
            </button>
          )}
        </div>
      </div>

      <div className="panel" key={`${c}-${i}`} aria-live="polite">
        <div className="panel__head">
          {STEPS[i]}
          <span className={`badge ${c === 'permitida' ? 'badge--ok' : 'badge--warn'}`}>{k.label}</span>
        </div>
        <div className="panel__body needs__detail">
          {i === 0 && (
            <>
              <h4 style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Doc style={{ width: 20, height: 20, color: 'var(--accent)' }} /> {k.action.t}
              </h4>
              <dl className="kv" style={{ marginTop: 14 }}>
                <dt>Agente</dt>
                <dd>{k.action.agent}</dd>
                <dt>Herramienta</dt>
                <dd>{k.action.tool}</dd>
                <dt>Destino</dt>
                <dd>{k.action.target}</dd>
                <dt>Datos implicados</dt>
                <dd>{k.action.data}</dd>
              </dl>
            </>
          )}
          {i === 1 && (
            <>
              <h4 style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Shield style={{ width: 20, height: 20, color: 'var(--accent)' }} /> {k.policy.name}
              </h4>
              <p className="muted" style={{ marginTop: 10 }}>
                {k.policy.rule}
              </p>
              <div style={{ marginTop: 14 }}>
                <span className={`badge ${c === 'permitida' ? 'badge--ok' : 'badge--warn'}`}>{k.policy.result}</span>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <h4 style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Users style={{ width: 20, height: 20, color: 'var(--accent)' }} /> {k.review.needed ? 'Revisión humana requerida' : 'Sin revisión humana'}
              </h4>
              <p className="muted" style={{ marginTop: 10 }}>
                {k.review.text}
              </p>
              {k.review.needed && (
                <div className="row" style={{ marginTop: 16 }}>
                  <span className="btn btn--secondary btn--sm" aria-hidden="true">
                    Ver contexto
                  </span>
                  <span className="btn btn--primary btn--sm" aria-hidden="true">
                    Revisar
                  </span>
                </div>
              )}
            </>
          )}
          {i === 3 && (
            <>
              <h4>Decisión</h4>
              <div style={{ marginTop: 10 }}>
                <span className={`badge badge--${k.decision.badge}`}>{k.decision.t}</span>
              </div>
              <p className="muted" style={{ marginTop: 12 }}>
                {c === 'permitida' ? 'La acción se ejecuta. Si la política cambiara, el mismo tipo de acción podría pasar a requerir revisión.' : 'La persona responsable ajustó una condición antes de aprobar. El agente ejecuta la versión aprobada, no la original.'}
              </p>
            </>
          )}
          {i === 4 && (
            <>
              <h4>Registro</h4>
              <div className="timeline" style={{ marginTop: 12 }}>
                {k.log.map((l) => (
                  <div className="timeline__item" key={l}>
                    <span className="timeline__dot">
                      <Check />
                    </span>
                    <div>
                      <strong>{l}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <p className="small muted" style={{ marginTop: 18, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
            Esta demostración explica el recorrido. No es un motor real de evaluación de políticas.
          </p>
        </div>
      </div>
    </div>
  )
}
