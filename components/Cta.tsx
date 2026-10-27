import Link from 'next/link'
import { ArrowRight } from './Icons'

export default function Cta({
  title,
  text,
  button,
  href,
  light,
}: {
  title: string
  text?: string
  button: string
  href: string
  light?: boolean
}) {
  return (
    <section className={`cta${light ? ' cta--light' : ''}`}>
      <div className="container cta__inner">
        <div style={{ maxWidth: 620 }}>
          <h2>{title}</h2>
          {text && <p className="lead" style={{ marginTop: 10, color: 'inherit' }}>{text}</p>}
        </div>
        <Link href={href} className="btn btn--primary">
          {button} <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
