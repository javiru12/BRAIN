'use client'

import { useId, useState, type ReactNode } from 'react'
import { Plus } from './Icons'

export default function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div className="accordion__item" key={i}>
          <h3 style={{ fontSize: 'inherit', margin: 0 }}>
            <button
              className="accordion__trigger"
              aria-expanded={open === i}
              aria-controls={`${uid}-p-${i}`}
              id={`${uid}-t-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {it.q}
              <Plus />
            </button>
          </h3>
          <div
            id={`${uid}-p-${i}`}
            role="region"
            aria-labelledby={`${uid}-t-${i}`}
            hidden={open !== i}
            className="accordion__panel prose"
          >
            {typeof it.a === 'string' ? <p>{it.a}</p> : it.a}
          </div>
        </div>
      ))}
    </div>
  )
}
