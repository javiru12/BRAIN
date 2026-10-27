'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { services, products } from '@/content/site'
import { ArrowRight, Bot, ChevronDown, Close, Compass, Menu, Plug, Target } from './Icons'

const serviceIcons = { target: Target, bot: Bot, plug: Plug, compass: Compass } as const

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [mobileGroup, setMobileGroup] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobile])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobile(false)
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  const isSol = pathname.startsWith('/soluciones')
  const isProd = pathname.startsWith('/productos')
  const isEmp = pathname.startsWith('/empresa')

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="BRAIN, inicio">
          <img src="/brand/brain-logo.svg" alt="BRAIN" width={92} height={28} />
        </Link>

        <nav className="nav" aria-label="Principal" ref={navRef}>
          <div className="nav__item" onMouseEnter={() => setOpen('sol')} onMouseLeave={() => setOpen(null)}>
            <button
              className={`nav__link${isSol ? ' is-active' : ''}`}
              aria-expanded={open === 'sol'}
              aria-controls="menu-sol"
              onClick={() => setOpen(open === 'sol' ? null : 'sol')}
            >
              Qué hacemos <ChevronDown />
            </button>
            <div id="menu-sol" className={`menu menu--wide${open === 'sol' ? ' is-open' : ''}`}>
              {services.map((s) => {
                const Icon = serviceIcons[s.icon as keyof typeof serviceIcons]
                return (
                  <Link key={s.href} href={s.href} className="menu__item" tabIndex={open === 'sol' ? 0 : -1}>
                    <span className="menu__icon">
                      <Icon />
                    </span>
                    <span>
                      <span className="menu__title">{s.label}</span>
                      <span className="menu__desc">{s.desc}</span>
                    </span>
                  </Link>
                )
              })}
              <Link href="/soluciones" className="menu__all link" tabIndex={open === 'sol' ? 0 : -1}>
                Ver todas las soluciones <ArrowRight />
              </Link>
            </div>
          </div>

          <div className="nav__item" onMouseEnter={() => setOpen('prod')} onMouseLeave={() => setOpen(null)}>
            <button
              className={`nav__link${isProd ? ' is-active' : ''}`}
              aria-expanded={open === 'prod'}
              aria-controls="menu-prod"
              onClick={() => setOpen(open === 'prod' ? null : 'prod')}
            >
              Productos <ChevronDown />
            </button>
            <div id="menu-prod" className={`menu${open === 'prod' ? ' is-open' : ''}`}>
              {products.map((p) => (
                <Link key={p.href} href={p.href} className="menu__item" tabIndex={open === 'prod' ? 0 : -1}>
                  <span>
                    <span className="menu__title">{p.label}</span>
                    <span className="menu__desc">{p.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/empresa" className="nav__link" aria-current={isEmp ? 'page' : undefined}>
            Quiénes somos
          </Link>
        </nav>

        <div className="header__actions">
          <Link href="/contacto" className="btn btn--dark btn--sm">
            Hablemos
          </Link>
          <button
            className="burger"
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            aria-label={mobile ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav${mobile ? ' is-open' : ''}`} aria-hidden={!mobile}>
        <nav aria-label="Principal móvil">
          <div className="mobile-nav__group">
            <button
              className="mobile-nav__toggle"
              aria-expanded={mobileGroup === 'sol'}
              onClick={() => setMobileGroup(mobileGroup === 'sol' ? null : 'sol')}
            >
              Qué hacemos <ChevronDown />
            </button>
            <div className={`mobile-nav__list${mobileGroup === 'sol' ? ' is-open' : ''}`}>
              <Link href="/soluciones" aria-current={pathname === '/soluciones' ? 'page' : undefined}>
                <strong>Todas las soluciones</strong>
              </Link>
              {services.map((s) => (
                <Link key={s.href} href={s.href} aria-current={pathname === s.href ? 'page' : undefined}>
                  <strong>{s.label}</strong>
                  {s.desc}
                </Link>
              ))}
            </div>
          </div>
          <div className="mobile-nav__group">
            <button
              className="mobile-nav__toggle"
              aria-expanded={mobileGroup === 'prod'}
              onClick={() => setMobileGroup(mobileGroup === 'prod' ? null : 'prod')}
            >
              Productos <ChevronDown />
            </button>
            <div className={`mobile-nav__list${mobileGroup === 'prod' ? ' is-open' : ''}`}>
              {products.map((p) => (
                <Link key={p.href} href={p.href} aria-current={pathname === p.href ? 'page' : undefined}>
                  <strong>{p.label}</strong>
                  {p.desc}
                </Link>
              ))}
            </div>
          </div>
          <div className="mobile-nav__group">
            <Link href="/empresa" className="mobile-nav__link" aria-current={isEmp ? 'page' : undefined}>
              Quiénes somos
            </Link>
          </div>
          <Link href="/contacto" className="btn btn--dark">
            Hablemos
          </Link>
        </nav>
      </div>
    </header>
  )
}
