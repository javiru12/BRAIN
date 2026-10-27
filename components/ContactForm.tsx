'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { interests, type Interest } from '@/content/site'
import { contactConfig } from '@/content/contact'
import { Alert, ArrowRight, Check } from './Icons'

const valid = new Set<string>(interests.map((i) => i.value))

type Errors = Partial<Record<'nombre' | 'correo' | 'mensaje', string>>

export default function ContactForm() {
  const params = useSearchParams()
  const [interes, setInteres] = useState<Interest | ''>('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle')

  useEffect(() => {
    const p = params.get('interes')
    if (p && valid.has(p)) setInteres(p as Interest)
  }, [params])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const nombre = String(data.get('nombre') ?? '').trim()
    const correo = String(data.get('correo') ?? '').trim()
    const mensaje = String(data.get('mensaje') ?? '').trim()
    const errs: Errors = {}
    if (!nombre) errs.nombre = 'Indica tu nombre.'
    if (!correo) errs.correo = 'Indica un correo de contacto.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errs.correo = 'Revisa el formato del correo.'
    if (!mensaje) errs.mensaje = 'Cuéntanos brevemente qué necesitas resolver.'
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }

    if (!contactConfig.endpoint) {
      setStatus('unconfigured')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(contactConfig.endpoint, {
        method: contactConfig.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="grid grid-2" style={{ gap: 18 }}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" autoComplete="name" required aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'err-nombre' : undefined} />
          {errors.nombre && (
            <span className="field__error" id="err-nombre">
              {errors.nombre}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" autoComplete="email" required aria-invalid={!!errors.correo} aria-describedby={errors.correo ? 'err-correo' : undefined} />
          {errors.correo && (
            <span className="field__error" id="err-correo">
              {errors.correo}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="empresa">
            Empresa <span>(opcional)</span>
          </label>
          <input id="empresa" name="empresa" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="interes">
            Interés <span>(opcional)</span>
          </label>
          <select id="interes" name="interes" value={interes} onChange={(e) => setInteres(e.target.value as Interest | '')}>
            <option value="">Selecciona una opción</option>
            {interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="mensaje">¿Qué necesitas resolver?</label>
        <textarea id="mensaje" name="mensaje" required aria-invalid={!!errors.mensaje} aria-describedby={errors.mensaje ? 'err-mensaje' : 'help-mensaje'} />
        {errors.mensaje ? (
          <span className="field__error" id="err-mensaje">
            {errors.mensaje}
          </span>
        ) : (
          <span className="small muted" id="help-mensaje">
            El proceso, el equipo implicado y el resultado que esperas. No incluyas datos confidenciales.
          </span>
        )}
      </div>

      {status === 'unconfigured' && (
        <div className="notice notice--warn" role="alert" style={{ display: 'flex', gap: 10 }}>
          <Alert style={{ width: 20, height: 20, flex: 'none' }} />
          <span>
            <strong>El envío del formulario todavía no está activado.</strong> Tus datos no se han enviado. Estamos terminando de configurar el canal de recepción; mientras tanto, conserva tu mensaje para enviarlo cuando esté disponible.
          </span>
        </div>
      )}
      {status === 'error' && (
        <div className="notice notice--danger" role="alert">
          No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.
        </div>
      )}
      {status === 'sent' && (
        <div className="notice" role="status" style={{ display: 'flex', gap: 10, background: 'var(--ok-soft)', borderColor: '#b8e0c6', color: 'var(--ok)' }}>
          <Check style={{ width: 20, height: 20, flex: 'none' }} />
          Mensaje recibido. Gracias por escribirnos.
        </div>
      )}

      <div>
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'} <ArrowRight />
        </button>
      </div>
    </form>
  )
}
