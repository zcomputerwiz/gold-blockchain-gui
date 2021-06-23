#!/bin/bash
set -e

# cd /Users/sk/Desktop/chia-blockchain/chia-blockchain-gui

# . ../venv/bin/activate
npm install
npm audit fix || true
npm run build
npm run electron &

