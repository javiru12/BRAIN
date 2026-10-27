export const site = {
  name: 'BRAIN',
  title: 'BRAIN | Soluciones de inteligencia artificial para empresas',
  description:
    'Diseñamos, desarrollamos e implementamos soluciones de IA. Conoce nuestros agentes, servicios y productos propios: LAZO y Nodra.',
  tagline: 'Soluciones de IA para hacer avanzar tu empresa.',
  purpose: 'Convertimos el conocimiento de las organizaciones en capacidad para actuar.',
  // Dominio canónico pendiente de definir. No se inventa.
  url: undefined as string | undefined,
}

export type NavLink = { href: string; label: string; desc?: string }

export const services: (NavLink & { slug: string; short: string; icon: string })[] = [
  {
    slug: 'a-medida',
    href: '/soluciones/a-medida',
    label: 'Soluciones a medida',
    short: 'A medida',
    desc: 'Diseño y desarrollo alrededor de tus procesos y objetivos.',
    icon: 'target',
  },
  {
    slug: 'agentes-ia',
    href: '/soluciones/agentes-ia',
    label: 'Agentes de IA',
    short: 'Agentes',
    desc: 'Contexto y herramientas para participar en tareas y flujos de trabajo.',
    icon: 'bot',
  },
  {
    slug: 'implementacion-ia',
    href: '/soluciones/implementacion-ia',
    label: 'Implementación',
    short: 'Implementación',
    desc: 'Integración, validación y acompañamiento de la adopción.',
    icon: 'plug',
  },
  {
    slug: 'consultoria-ia',
    href: '/soluciones/consultoria-ia',
    label: 'Consultoría especializada',
    short: 'Consultoría',
    desc: 'Análisis de oportunidades y definición de una ruta para avanzar.',
    icon: 'compass',
  },
]

export const products: (NavLink & { slug: 'lazo' | 'nodra' })[] = [
  {
    slug: 'lazo',
    href: '/productos/lazo',
    label: 'LAZO',
    desc: 'Relaciones comerciales con contexto y dirección.',
  },
  {
    slug: 'nodra',
    href: '/productos/nodra',
    label: 'Nodra',
    desc: 'Gobierno y control de tu ecosistema de IA.',
  },
]

export const mainNav = [
  { href: '/soluciones', label: 'Qué hacemos', children: services },
  { href: '/productos/lazo', label: 'Productos', children: products },
  { href: '/empresa', label: 'Quiénes somos' },
]

export const interests = [
  { value: 'a-medida', label: 'Solución a medida' },
  { value: 'agentes', label: 'Agentes de IA' },
  { value: 'implementacion', label: 'Implementación' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'lazo', label: 'LAZO' },
  { value: 'nodra', label: 'Nodra' },
  { value: 'orientacion', label: 'Necesito orientación' },
] as const

export type Interest = (typeof interests)[number]['value']
