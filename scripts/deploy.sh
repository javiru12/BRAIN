#!/usr/bin/env bash
# Despliegue de brainia.mx: compila, sube out/ a S3 e invalida CloudFront.
# Uso: npm run deploy
set -euo pipefail
cd "$(dirname "$0")/.."

PROFILE="${AWS_PROFILE:-otraempresa}"
BUCKET="brain-web-738685083380"
DIST_ID="E3D0CQNB854L8X"

echo "▶ Compilando…"
npm run build

echo "▶ Subiendo _next/ (caché larga, inmutable)…"
aws s3 sync out/_next "s3://$BUCKET/_next" \
  --profile "$PROFILE" --only-show-errors \
  --cache-control "public,max-age=31536000,immutable"

echo "▶ Subiendo el resto (caché corta)…"
aws s3 sync out "s3://$BUCKET" \
  --profile "$PROFILE" --only-show-errors \
  --exclude "_next/*" \
  --delete \
  --cache-control "public,max-age=300,must-revalidate"

echo "▶ Invalidando CloudFront…"
INV=$(aws cloudfront create-invalidation \
  --profile "$PROFILE" \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' --output text)
echo "   Invalidación $INV creada."

echo "✓ Publicado: https://brainia.mx"
