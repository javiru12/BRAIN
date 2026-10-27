import Link from 'next/link'
import { ArrowRight } from '@/components/Icons'

export const metadata = { title: 'Página no encontrada | BRAIN' }

export default function NotFound() {
  return (
    <div className="container notfound">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1>No encontramos esta página.</h1>
        <p className="lead" style={{ margin: '16px auto 28px' }}>
          Puede que el enlace esté mal escrito o que la página haya cambiado de lugar.
        </p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link href="/" className="btn btn--primary">
            Ir al inicio <ArrowRight />
          </Link>
          <Link href="/soluciones" className="btn btn--secondary">
            Ver soluciones
          </Link>
        </div>
      </div>
    </div>
  )
}
