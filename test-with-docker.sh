#!/bin/bash

echo "🐳 Testing GitHub Actions with Docker..."

# Use Ubuntu image similar to GitHub Actions
docker run --rm -it \
  -v $(pwd):/workspace \
  -w /workspace \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  ubuntu:22.04 \
  bash -c "
    # Install Node.js 18
    apt-get update && apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs

    # Install pnpm
    npm install -g pnpm

    # Show environment
    echo 'Node version:' \$(node --version)
    echo 'pnpm version:' \$(pnpm --version)
    ls -la

    # Install dependencies
    pnpm install --frozen-lockfile

    # Run checks
    pnpm run type-check
    pnpm run lint

    # Build
    pnpm run build

    echo '✅ Docker test completed!'
  "