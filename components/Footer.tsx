import Link from 'next/link'
import { services, products, site } from '@/content/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/brand/brain-logo.svg" alt="BRAIN" width={92} height={28} />
            <p>{site.purpose}</p>
          </div>
          <div>
            <h4>Qué hacemos</h4>
            <ul>
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Productos</h4>
            <ul>
              {products.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li>
                <Link href="/empresa">Quiénes somos</Link>
              </li>
              <li>
                <Link href="/contacto">Hablemos</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} BRAIN. Soluciones de inteligencia artificial.</span>
          <span>Las interfaces mostradas en este sitio son ejemplos ilustrativos.</span>
        </div>
      </div>
    </footer>
  )
}
