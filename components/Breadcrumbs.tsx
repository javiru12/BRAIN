import Link from 'next/link'

export default function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="breadcrumbs">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        {items.map((it, i) => (
          <li key={i} aria-current={i === items.length - 1 ? 'page' : undefined}>
            {it.href && i < items.length - 1 ? <Link href={it.href}>{it.label}</Link> : it.label}
          </li>
        ))}
      </ol>
    </nav>
  )
}
