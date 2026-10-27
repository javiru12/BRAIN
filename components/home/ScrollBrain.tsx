'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from '../Icons'

const FRAMES = 121
const HERO_END = 0.1
const CHAPTERS = [
  { from: 0.3, to: 0.56, eyebrow: 'Conectar', title: 'Cada dato, cada sistema y cada persona, conectados.' },
  { from: 0.64, to: 0.84, eyebrow: 'Entrar al detalle', title: 'Entramos en lo que importa: tu operación.' },
]
const TITLE = 'Soluciones de IA para hacer avanzar tu empresa.'.split(' ')

const src = (dir: string, i: number) => `/motion/${dir}/${String(i + 1).padStart(3, '0')}.webp`
const clamp = (n: number) => Math.min(1, Math.max(0, n))

/** Portada: el hero se apoya sobre un cerebro que, al hacer scroll, se recorre en cámara hasta entrar en un nodo. */
export default function ScrollBrain() {
  const wrap = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const veil = useRef<HTMLDivElement>(null)
  const hint = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(-1)
  const [hero, setHero] = useState(true)
  const [still, setStill] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.innerWidth < 760
    const dir = mobile ? 'sm' : 'lg'
    const cv = canvas.current!
    const ctx = cv.getContext('2d')!
    const imgs: (HTMLImageElement | undefined)[] = new Array(FRAMES)
    let raf = 0
    let alive = true
    let lastFrame = 0
    let p = 0

    const load = (i: number) =>
      new Promise<void>((res) => {
        if (imgs[i]) return res()
        const im = new Image()
        im.decoding = 'async'
        im.onload = () => {
          imgs[i] = im
          res()
        }
        im.onerror = () => res()
        im.src = src(dir, i)
      })

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = cv.getBoundingClientRect()
      cv.width = Math.round(r.width * dpr)
      cv.height = Math.round(r.height * dpr)
      draw()
    }

    function draw() {
      let k = lastFrame
      while (k >= 0 && !imgs[k]) k--
      if (k < 0) {
        k = lastFrame
        while (k < FRAMES && !imgs[k]) k++
      }
      const im = imgs[k]
      if (!im) return
      const cw = cv.width
      const ch = cv.height
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight)
      const w = im.naturalWidth * s
      const h = im.naturalHeight * s
      // El cerebro arranca desplazado para dejar sitio al texto y se centra al avanzar
      const shift = 1 - clamp(p / 0.35)
      const ox = mobile ? 0 : cw * 0.2 * shift
      const oy = mobile ? ch * 0.2 * shift : 0
      ctx.drawImage(im, (cw - w) / 2 + ox, (ch - h) / 2 + oy, w, h)
    }

    function update() {
      raf = 0
      const el = wrap.current!
      const r = el.getBoundingClientRect()
      const total = r.height - el.firstElementChild!.getBoundingClientRect().height
      p = clamp(-r.top / total)
      lastFrame = Math.round(clamp(p / 0.9) * (FRAMES - 1))
      draw()
      setHero((h) => (h === p <= HERO_END ? h : p <= HERO_END))
      const c = CHAPTERS.findIndex((x) => p >= x.from && p <= x.to)
      setChapter((prev) => (prev === c ? prev : c))
      // El final del video es un destello blanco-azul: se funde a blanco para enlazar con la siguiente sección
      if (veil.current) veil.current.style.opacity = String(clamp((p - 0.86) / 0.12))
      if (hint.current) hint.current.style.opacity = String(1 - clamp(p / 0.05))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    ;(async () => {
      if (reduced) {
        setStill(true)
        lastFrame = 14
        await load(14)
        if (!alive) return
        size()
        setReady(true)
        return
      }
      await load(0)
      if (!alive) return
      size()
      setReady(true)
      update()
      // Resto de fotogramas: primero uno de cada 6 (para que un scroll rápido tenga qué mostrar), luego los demás
      const order: number[] = []
      for (let i = 6; i < FRAMES; i += 6) order.push(i)
      for (let i = 1; i < FRAMES; i++) if (!order.includes(i)) order.push(i)
      for (let n = 0; n < order.length && alive; n += 4) {
        await Promise.all(order.slice(n, n + 4).map(load))
        draw()
      }
    })()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', size)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', size)
    }
  }, [])

  const heroOn = still || hero

  return (
    <section ref={wrap} className={`sb${still ? ' sb--still' : ''}`}>
      <div className="sb__stick">
        <canvas ref={canvas} className={`sb__canvas${ready ? ' is-ready' : ''}`} aria-hidden="true" />
        <div className="sb__scrim" aria-hidden="true" />
        <div className="container sb__copy">
          <div className={`sb__text sb__hero${heroOn ? ' is-on' : ''}`}>
            <p className="eyebrow">Soluciones de inteligencia artificial</p>
            <h1 className="hero__title">
              {TITLE.map((w, i) => (
                <span key={i}>
                  <span className="w">{w}</span>{' '}
                </span>
              ))}
            </h1>
            <p className="lead sb__lead">
              Diseñamos, desarrollamos e implementamos soluciones de inteligencia artificial. Creamos agentes y productos que conectan conocimiento, sistemas y procesos.
            </p>
            <div className="sb__actions">
              <Link href="/soluciones" className="btn btn--primary" tabIndex={heroOn ? 0 : -1}>
                Explorar soluciones <ArrowRight />
              </Link>
              <Link href="/productos/lazo" className="btn btn--secondary" tabIndex={heroOn ? 0 : -1}>
                Ver productos
              </Link>
            </div>
          </div>
          {!still &&
            CHAPTERS.map((c, i) => (
              <div key={c.title} className={`sb__text${chapter === i ? ' is-on' : ''}`} aria-hidden={chapter !== i}>
                <p className="eyebrow">{c.eyebrow}</p>
                <h2>{c.title}</h2>
              </div>
            ))}
        </div>
        {!still && (
          <div ref={hint} className="sb__hint" aria-hidden="true">
            <span>Desplaza para entrar</span>
            <i />
          </div>
        )}
        <span className="sb__tag badge badge--neutral">Recorrido ilustrativo</span>
        <div ref={veil} className="sb__veil" aria-hidden="true" />
      </div>
    </section>
  )
}
