// Genera public/og.png (1200x630) con el logo y el mensaje principal.
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const logo = readFileSync('public/brand/brain-logo.svg', 'utf8').replace(/<\?xml[^>]*>/, '')
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="8" fill="#426B83"/>
  <g transform="translate(96,96) scale(0.19)">${logo.replace(/<svg[^>]*>/, '<g>').replace('</svg>', '</g>')}</g>
  <text x="96" y="300" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4" fill="#426B83">SOLUCIONES DE INTELIGENCIA ARTIFICIAL</text>
  <text x="96" y="390" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#111827" letter-spacing="-1">Soluciones de IA para</text>
  <text x="96" y="470" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="700" fill="#111827" letter-spacing="-1">hacer avanzar tu empresa.</text>
  <text x="96" y="560" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#667085">brainia.mx</text>
</svg>`
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png')
console.log('public/og.png generado')
