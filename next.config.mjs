/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exportación estática: el sitio no tiene servidor ni API. Se sirve desde S3 + CloudFront.
  output: 'export',
  // Cada ruta se genera como carpeta/index.html, que S3 resuelve sin reglas extra.
  trailingSlash: true,
  images: { unoptimized: true },
}
export default nextConfig
