// Verificación visual y de consola: captura cada ruta en escritorio y móvil.
// Uso: node scripts/verify.mjs [baseUrl]
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3000'
const routes = ['/', '/soluciones', '/soluciones/a-medida', '/soluciones/agentes-ia', '/soluciones/implementacion-ia', '/soluciones/consultoria-ia', '/empresa', '/productos/lazo', '/productos/nodra', '/contacto', '/contacto?interes=nodra', '/ruta-inexistente']
const out = 'scripts/shots'
mkdirSync(out, { recursive: true })

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
let failures = 0
for (const [name, vp] of [
  ['desktop', { width: 1366, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  const logs = []
  page.on('console', (m) => {
    if (!['error', 'warning'].includes(m.type())) return
    // La propia página 404 responde 404: no es un error de la aplicación.
    if (page.url().includes('ruta-inexistente') && m.text().includes('404')) return
    logs.push(`${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`))
  for (const r of routes) {
    logs.length = 0
    const res = await page.goto(base + r, { waitUntil: 'networkidle' })
    const title = await page.title()
    const h1s = await page.locator('h1').count()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
    // Fuerza la aparición de los elementos .reveal para la captura
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')))
    await page.waitForTimeout(400)
    const file = `${out}/${name}${r.replace(/[\/?=]/g, '_') || '_home'}.png`
    await page.screenshot({ path: file, fullPage: true })
    const bad = (r === '/ruta-inexistente' ? res.status() !== 404 : res.status() !== 200) || h1s !== 1 || overflow || logs.length
    if (bad) failures++
    console.log(`${bad ? '✗' : '✓'} [${name}] ${r} → ${res.status()} | h1=${h1s} | overflow=${overflow} | "${title}"${logs.length ? '\n    ' + logs.join('\n    ') : ''}`)
  }
  await ctx.close()
}
await browser.close()
console.log(failures ? `\n${failures} comprobaciones con problemas` : '\nTodo correcto')
process.exit(failures ? 1 : 0)
