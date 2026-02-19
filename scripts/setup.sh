#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Setting up Nexus Crypto AI development environment..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed."; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "pnpm is required. Install with: npm install -g pnpm"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed."; exit 1; }

# Copy environment file
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
pnpm install

# Build shared packages
echo "Building shared packages..."
pnpm turbo run build --filter='./packages/*'

# Start infrastructure
echo "Starting PostgreSQL and Redis..."
docker compose -f docker/docker-compose.yml up -d postgres redis

# Wait for services
echo "Waiting for services to be healthy..."
sleep 5

# Set up Python virtual environment for ML service
echo "Setting up Python environment..."
if [ ! -d apps/ml-service/.venv ]; then
  python3 -m venv apps/ml-service/.venv
fi
source apps/ml-service/.venv/bin/activate
pip install -r apps/ml-service/requirements.txt
deactivate

echo ""
echo "Setup complete! You can now run:"
echo "  pnpm dev:api    - Start the API server"
echo "  pnpm dev:ml     - Start the ML service"
echo "  pnpm dev:mobile - Start the React Native app"
