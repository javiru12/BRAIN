'use client'

import { useInView } from '@/lib/useInView'

/** Chips de herramientas con entrada escalonada. Son nombres, no logos: no implican acuerdo ni integración con terceros. */
export default function ToolChips({ items, label }: { items: string[]; label: string }) {
  const { ref, seen } = useInView<HTMLUListElement>(0.2)
  return (
    <ul ref={ref} className={`tools${seen ? ' is-on' : ''}`} aria-label={label}>
      {items.map((t, i) => (
        <li key={t} style={{ ['--i' as string]: i }}>
          <span className="tools__mark" aria-hidden="true">
            {t.replace(/^Migrar desde /, '').charAt(0)}
          </span>
          {t}
        </li>
      ))}
    </ul>
  )
}
