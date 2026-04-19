#!/usr/bin/env bash
set -e

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║   Xerovolt ERV Controller Setup      ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

# 1. Install dependencies
echo "→ Installing dependencies..."
npm install

# 2. Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "→ Created .env.local from template"
  echo ""
  echo "  ⚠  IMPORTANT: Edit .env.local and add your Tuya credentials:"
  echo "     TUYA_ACCESS_ID, TUYA_ACCESS_SECRET, TUYA_DEVICE_ID"
  echo ""
else
  echo "→ .env.local already exists — skipping"
fi

echo ""
echo "  ✓ Setup complete!"
echo "  Run: npm run dev"
echo "  Open: http://localhost:3000"
echo ""
