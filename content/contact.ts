/**
 * Configuración del formulario de contacto.
 *
 * PENDIENTE: no existe todavía un destino para recibir formularios.
 * Cuando BRAIN defina el canal (endpoint propio, servicio de formularios,
 * correo transaccional, CRM…), indica aquí la URL. Mientras `endpoint`
 * sea null, el formulario valida los campos pero no envía nada y lo
 * comunica con claridad. Nunca simula un envío exitoso.
 */
export const contactConfig = {
  endpoint: null as string | null,
  method: 'POST' as const,
}
