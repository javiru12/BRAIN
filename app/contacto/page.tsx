import { Suspense } from 'react'
import { pageMeta } from '@/lib/metadata'
import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import { Check } from '@/components/Icons'

export const metadata = pageMeta({
  title: 'Hablemos',
  description: 'Cuéntanos el contexto de tu organización y la oportunidad que quieres explorar: solución a medida, agentes, implementación, consultoría, LAZO o Nodra.',
  path: '/contacto',
})

export default function Contacto() {
  return (
    <section className="page-hero" style={{ paddingBottom: 80 }}>
      <div className="container">
        <Breadcrumbs items={[{ label: 'Hablemos' }]} />
        <div className="split" style={{ alignItems: 'start', gridTemplateColumns: 'minmax(0,4fr) minmax(0,7fr)' }}>
          <div>
            <p className="eyebrow">Contacto</p>
            <h1>Empecemos por lo que necesitas resolver.</h1>
            <p className="lead">Cuéntanos el contexto de tu organización y la oportunidad que quieres explorar. Podemos conversar sobre una solución a medida, implementación o alguno de nuestros productos.</p>
            <ul className="stack" style={{ marginTop: 28, gap: 10 }}>
              {['Una primera conversación para entender el proceso y el objetivo.', 'Orientación sobre si conviene una solución a medida, un piloto, consultoría o un producto.', 'Sin compromiso y sin necesidad de compartir información confidencial.'].map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, color: 'var(--text-2)', fontSize: '0.95rem' }}>
                  <Check style={{ width: 18, height: 18, color: 'var(--accent)', flex: 'none', marginTop: 3 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
