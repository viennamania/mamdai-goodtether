#!/bin/bash

# Build script with memory optimization for Next.js project
echo "🚀 Starting optimized Next.js build..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Set Node.js memory options
export NODE_OPTIONS="--max-old-space-size=8192 --optimize-for-size"

# Run garbage collection more aggressively
export NODE_ENV=production

echo "💾 Memory limit set to 8GB"
echo "🔧 Running build with optimizations..."

# Run the build
pnpm build

echo "✅ Build completed!"