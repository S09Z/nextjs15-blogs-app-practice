#!/bin/bash

echo "🚀 Testing GitHub Actions build locally..."

# Simulate GitHub Actions environment
export GITHUB_WORKSPACE=$(pwd)
export GITHUB_REPOSITORY="your-username/nextjs15-blogs-practice"
export GITHUB_REF="refs/heads/main"
export GITHUB_SHA=$(git rev-parse HEAD 2>/dev/null || echo "local-test")
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

echo "📋 Environment Setup:"
echo "Working Directory: $GITHUB_WORKSPACE"
echo "Repository: $GITHUB_REPOSITORY"
echo "Branch: $GITHUB_REF"
echo "Commit: $GITHUB_SHA"
echo "Node ENV: $NODE_ENV"
echo ""

echo "🔍 Step 1: Show environment"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Directory contents:"
ls -la
echo ""

echo "📦 Step 2: Setup pnpm"
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm
fi
echo "pnpm version: $(pnpm --version)"
echo ""

echo "⬇️ Step 3: Install dependencies"
if pnpm install --frozen-lockfile; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

echo "🔧 Step 4: Type check"
if pnpm run type-check; then
    echo "✅ Type check passed"
else
    echo "❌ Type check failed"
    exit 1
fi
echo ""

echo "🧹 Step 5: Lint"
if pnpm run lint; then
    echo "✅ Linting passed"
else
    echo "❌ Linting failed"
    exit 1
fi
echo ""

echo "🏗️ Step 6: Build"
if pnpm run build; then
    echo "✅ Build completed successfully"
    echo "Build directory contents:"
    ls -la .next/ 2>/dev/null || echo ".next directory not found"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 All steps completed successfully!"