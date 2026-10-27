'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ProductSubnav({
  brand,
  items,
  cta,
}: {
  brand: string
  items: { id: string; label: string }[]
  cta: { label: string; href: string }
}) {
  const [active, setActive] = useState(items[0].id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  return (
    <div className="subnav">
      <div className="container subnav__inner">
        <span className="subnav__brand">{brand}</span>
        <nav className="subnav__links" aria-label={`Secciones de ${brand}`}>
          {items.map((i) => (
            <a key={i.id} href={`#${i.id}`} className={active === i.id ? 'is-active' : undefined} aria-current={active === i.id ? 'location' : undefined}>
              {i.label}
            </a>
          ))}
        </nav>
        <Link href={cta.href} className="btn btn--primary btn--sm">
          {cta.label}
        </Link>
      </div>
    </div>
  )
}
