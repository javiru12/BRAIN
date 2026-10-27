'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from '../Icons'

const NEEDS = [
  {
    id: 'comercial',
    label: 'Seguimiento y relaciones comerciales',
    title: 'Dar continuidad a cada cuenta con contexto',
    text: 'Cuando el seguimiento comercial depende de la memoria de cada persona, se pierden compromisos, señales y oportunidades de introducción. Una solución con agentes puede reunir conversaciones, personas y objetivos de cada cuenta y preparar el siguiente movimiento para que el equipo decida.',
    link: { href: '/productos/lazo', label: 'Conocer LAZO' },
    alt: { href: '/soluciones/agentes-ia', label: 'Ver agentes de IA' },
  },
  {
    id: 'conocimiento',
    label: 'Consulta de conocimiento interno',
    title: 'Responder con las fuentes correctas',
    text: 'Manuales, políticas, documentación técnica e históricos suelen estar dispersos. Un agente con acceso autorizado a esas fuentes puede responder preguntas del equipo, citar de dónde sale la respuesta y avisar cuando la información no existe o está desactualizada.',
    link: { href: '/soluciones/agentes-ia', label: 'Ver agentes de IA' },
    alt: { href: '/soluciones/a-medida', label: 'Soluciones a medida' },
  },
  {
    id: 'operativo',
    label: 'Coordinación de un proceso operativo',
    title: 'Hacer avanzar un proceso con pasos claros',
    text: 'Solicitudes, validaciones, excepciones y entregas que pasan por varias personas y sistemas. Una solución a medida puede preparar cada paso, consultar los sistemas implicados y pedir aprobación cuando una decisión lo requiere, con registro de lo ocurrido.',
    link: { href: '/soluciones/a-medida', label: 'Soluciones a medida' },
    alt: { href: '/soluciones/implementacion-ia', label: 'Cómo implementamos' },
  },
  {
    id: 'gobierno',
    label: 'Gobierno del uso de IA',
    title: 'Saber qué IA se usa, con qué permisos y a qué coste',
    text: 'A medida que aparecen agentes, modelos y herramientas de IA en distintas áreas, hace falta una capa común de políticas, aprobaciones, registros y visibilidad del gasto. Nodra está diseñado para ese problema.',
    link: { href: '/productos/nodra', label: 'Conocer Nodra' },
    alt: { href: '/soluciones/consultoria-ia', label: 'Consultoría especializada' },
  },
  {
    id: 'especifica',
    label: 'Una solución específica para mi empresa',
    title: 'Empezar por el proceso, no por la tecnología',
    text: 'Si tienes un reto concreto que no encaja en una categoría, lo habitual es empezar con una conversación sobre el proceso, las fuentes de información y el resultado esperado. A partir de ahí definimos si conviene una solución a medida, un piloto o una fase de consultoría.',
    link: { href: '/contacto?interes=orientacion', label: 'Cuéntanos tu caso' },
    alt: { href: '/soluciones/consultoria-ia', label: 'Consultoría especializada' },
  },
]

export default function NeedsSelector() {
  const [sel, setSel] = useState(NEEDS[0].id)
  const cur = NEEDS.find((n) => n.id === sel)!
  return (
    <div className="needs">
      <div className="needs__list" role="group" aria-label="Necesidades">
        {NEEDS.map((n) => (
          <button key={n.id} className="needs__opt" aria-pressed={sel === n.id} onClick={() => setSel(n.id)}>
            {n.label}
            <ChevronRight />
          </button>
        ))}
      </div>
      <div className="card card--surface needs__detail" key={cur.id} aria-live="polite">
        <span className="badge badge--neutral" style={{ marginBottom: 14 }}>
          Oportunidad
        </span>
        <h3>{cur.title}</h3>
        <p style={{ marginTop: 8 }}>{cur.text}</p>
        <div className="row" style={{ marginTop: 22 }}>
          <Link href={cur.link.href} className="btn btn--primary btn--sm">
            {cur.link.label} <ArrowRight />
          </Link>
          <Link href={cur.alt.href} className="link">
            {cur.alt.label} <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}
