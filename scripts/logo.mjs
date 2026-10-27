import sharp from 'sharp'
const src = '../BRAINLGO.png'
async function cut(name, left, top, width, height, outW) {
  const { data, info } = await sharp(src).extract({ left, top, width, height }).greyscale().raw().toBuffer({ resolveWithObject: true })
  const rgba = Buffer.alloc(info.width * info.height * 4)
  for (let i = 0; i < data.length; i++) {
    const a = Math.max(0, Math.min(255, Math.round((255 - data[i]) * 1.15)))
    rgba[i * 4] = 17; rgba[i * 4 + 1] = 24; rgba[i * 4 + 2] = 39; rgba[i * 4 + 3] = a
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().resize({ width: outW }).png({ compressionLevel: 9 }).toFile(`public/brand/${name}.png`)
}
await cut('brain-logo', 120, 200, 1540, 480, 900)
await cut('brain-icon', 120, 200, 500, 480, 400)
