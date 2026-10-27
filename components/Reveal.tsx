'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Aparece suavemente al entrar en pantalla. Sin IntersectionObserver o con movimiento reducido, se muestra directamente. */
export default function Reveal({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any
  return (
    <T ref={ref} className={`reveal ${className}`}>
      {children}
    </T>
  )
}
