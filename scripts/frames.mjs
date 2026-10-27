// Convierte ../brain-motion.mp4 en secuencias WebP para la sección scroll-driven.
// Uso: node scripts/frames.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, readdirSync } from 'node:fs'
import sharp from 'sharp'
import ffmpeg from 'ffmpeg-static'

const src = '../brain-motion.mp4'
const tmp = 'scripts/shots/_frames'
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })
execFileSync(ffmpeg, ['-v', 'error', '-i', src, '-vf', 'fps=24,scale=1600:-1', `${tmp}/%04d.png`])
const files = readdirSync(tmp).filter((f) => f.endsWith('.png')).sort()

for (const [dir, w, q] of [['motion/lg', 1280, 72], ['motion/sm', 720, 70]]) {
  rmSync(`public/${dir}`, { recursive: true, force: true })
  mkdirSync(`public/${dir}`, { recursive: true })
  await Promise.all(files.map((f, i) => sharp(`${tmp}/${f}`).resize({ width: w }).webp({ quality: q }).toFile(`public/${dir}/${String(i + 1).padStart(3, '0')}.webp`)))
}
rmSync(tmp, { recursive: true, force: true })
console.log(`${files.length} frames`)
