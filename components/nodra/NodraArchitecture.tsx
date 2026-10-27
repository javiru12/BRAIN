'use client'

import { useState } from 'react'
import { Bot, Check, Cpu, Database, Doc, FileCheck, Grid, Shield, Wrench } from '../Icons'

const NODES = {
  agentes: { Icon: Bot, label: 'Agentes', t: 'Agentes', d: 'Sistemas que reciben objetivos y usan modelos y herramientas para avanzar tareas. Nodra define qué pueden hacer, con qué datos y cuándo necesitan aprobación.' },
  modelos: { Icon: Cpu, label: 'Modelos', t: 'Modelos', d: 'Modelos de lenguaje y otros modelos de IA utilizados por agentes y aplicaciones. Nodra registra su uso y su coste, y aplica políticas sobre el contenido que entra y sale.' },
  herramientas: { Icon: Wrench, label: 'Herramientas', t: 'Herramientas', d: 'Acciones que un agente puede ejecutar: consultar, crear, enviar, modificar. Cada herramienta puede quedar permitida, restringida o sujeta a aprobación.' },
  apps: { Icon: Grid, label: 'Aplicaciones', t: 'Aplicaciones y herramientas SaaS', d: 'Aplicaciones de IA usadas por personas de la organización. Nodra gobierna su acceso: quién puede usar qué, con qué confirmaciones y con qué revisión periódica.' },
  datos: { Icon: Database, label: 'Fuentes de datos', t: 'Fuentes de datos', d: 'Repositorios, sistemas y documentos a los que agentes y modelos acceden. Las políticas de manejo de datos definen qué puede consultarse y qué no debe salir.' },
  politicas: { Icon: Shield, label: 'Políticas', t: 'Políticas', d: 'Reglas sobre contenido, herramientas, manejo de datos y aprobación de acciones. Se definen por responsables de la organización y se aplican de forma transversal.' },
  aprobaciones: { Icon: Check, label: 'Aprobaciones', t: 'Aprobaciones', d: 'Puntos en los que una persona revisa antes de que algo ocurra: una acción de un agente, el acceso a una herramienta, un cambio de política.' },
  registros: { Icon: FileCheck, label: 'Registros', t: 'Registros', d: 'Trazabilidad de acciones, decisiones, aprobaciones, errores y costes. Es la base de la observabilidad y de la evaluación posterior.' },
} as const

type Key = keyof typeof NODES

function Node({ k, sel, onSelect }: { k: Key; sel: Key; onSelect: (k: Key) => void }) {
  const n = NODES[k]
  return (
    <button className="arch__node" aria-pressed={sel === k} onClick={() => onSelect(k)}>
      <n.Icon />
      {n.label}
    </button>
  )
}

export default function NodraArchitecture() {
  const [sel, setSel] = useState<Key>('agentes')
  const n = NODES[sel]
  return (
    <div className="arch">
      <div className="arch__canvas" role="group" aria-label="Diagrama de arquitectura de Nodra. Selecciona un componente para ver su explicación.">
        <div className="small muted" style={{ textAlign: 'center' }}>
          Componentes del ecosistema de IA de la organización
        </div>
        <div className="arch__layer">
          {(['agentes', 'modelos', 'herramientas', 'apps'] as Key[]).map((k) => (
            <Node key={k} k={k} sel={sel} onSelect={setSel} />
          ))}
        </div>
        <div className="arch__connector" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="arch__core">
          <span className="small" style={{ flexBasis: '100%', textAlign: 'center', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Nodra · capa de gobierno y control
          </span>
          {(['politicas', 'aprobaciones', 'registros'] as Key[]).map((k) => (
            <Node key={k} k={k} sel={sel} onSelect={setSel} />
          ))}
        </div>
        <div className="arch__connector" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="arch__layer" style={{ gridTemplateColumns: '1fr' }}>
          <Node k="datos" sel={sel} onSelect={setSel} />
        </div>
        <p className="small muted" style={{ textAlign: 'center' }}>
          Esquema ilustrativo. La compatibilidad con componentes concretos se evalúa en cada proyecto.
        </p>
      </div>
      <div className="arch__detail card card--surface" key={sel} aria-live="polite">
        <span className="icon-box">
          <n.Icon />
        </span>
        <h3>{n.t}</h3>
        <p>{n.d}</p>
      </div>
    </div>
  )
}
