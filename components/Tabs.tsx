'use client'

import { useId, useRef, useState, type ReactNode } from 'react'

export type TabItem = { id: string; label: string; icon?: ReactNode; content: ReactNode }

export default function Tabs({
  items,
  variant,
  label,
  initial,
}: {
  items: TabItem[]
  variant?: 'pills'
  label: string
  initial?: string
}) {
  const [active, setActive] = useState(initial ?? items[0].id)
  const uid = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKey(e: React.KeyboardEvent, i: number) {
    let next = i
    if (e.key === 'ArrowRight') next = (i + 1) % items.length
    else if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = items.length - 1
    else return
    e.preventDefault()
    setActive(items[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div className={`tabs${variant === 'pills' ? ' tabs--pills' : ''}`}>
      <div className="tabs__list" role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <button
            key={it.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`${uid}-tab-${it.id}`}
            aria-selected={active === it.id}
            aria-controls={`${uid}-panel-${it.id}`}
            tabIndex={active === it.id ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(it.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {it.icon}
            {it.label}
          </button>
        ))}
      </div>
      {items.map((it) => (
        <div
          key={it.id}
          role="tabpanel"
          id={`${uid}-panel-${it.id}`}
          aria-labelledby={`${uid}-tab-${it.id}`}
          hidden={active !== it.id}
          className="tabs__panel"
          tabIndex={0}
        >
          {it.content}
        </div>
      ))}
    </div>
  )
}
