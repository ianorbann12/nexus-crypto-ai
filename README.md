# Nexus Crypto AI

Crypto portfolio tracking + ML prediction mobile app built with a polyglot monorepo architecture.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native CLI, React Navigation v7, Zustand, react-native-wagmi-charts |
| API Gateway | Node.js, Fastify v5, Drizzle ORM, BullMQ, Socket.IO |
| ML Service | Python, FastAPI, PyTorch, scikit-learn |
| Database | PostgreSQL 16 + TimescaleDB |
| Cache/Queue | Redis 7 |
| Monorepo | Turborepo + pnpm workspaces |

## Project Structure

```
nexus-crypto-ai/
├── apps/
│   ├── mobile/           React Native app
│   ├── api/              Fastify API gateway
│   └── ml-service/       FastAPI ML microservice
├── packages/
│   ├── shared-types/     TypeScript type definitions
│   ├── shared-utils/     Common utility functions
│   ├── shared-constants/ Enums, chain IDs, exchange configs
│   ├── api-client/       Typed Axios wrapper for mobile
│   ├── eslint-config/    Shared ESLint configs
│   └── tsconfig/         Shared TypeScript configs
├── docker/               Docker Compose + Dockerfiles
└── scripts/              Setup and seed scripts
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9+
- Docker & Docker Compose
- Python 3.11+
- Xcode (for iOS) / Android Studio (for Android)

### Setup

```bash
# Clone the repo
git clone https://github.com/ianorbann12/nexus-crypto-ai.git
cd nexus-crypto-ai

# Run the setup script (installs deps, starts DB & Redis, sets up Python env)
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Development

```bash
# Start infrastructure (PostgreSQL + Redis)
docker compose -f docker/docker-compose.yml up -d postgres redis

# Start API gateway (http://localhost:3000, Swagger at /docs)
pnpm dev:api

# Start ML service (http://localhost:8000)
pnpm dev:ml

# Start React Native app
cd apps/mobile
npx react-native run-ios      # iOS
npx react-native run-android   # Android
```

### Build

```bash
# Build all TypeScript packages
pnpm turbo run build

# Start everything via Docker
docker compose -f docker/docker-compose.yml up -d
```

## Architecture

### API Gateway (`apps/api/`)

Module-based Fastify app with auth, portfolio, market data, AI predictions, alerts, and education modules. Each module follows a `routes → controller → service` pattern with Zod schema validation. Background jobs (price ingestion, portfolio sync, alert evaluation) run via BullMQ workers.

### ML Service (`apps/ml-service/`)

FastAPI microservice with a model registry supporting LSTM, Transformer, and Ensemble models. Features pipeline computes technical indicators, on-chain metrics, and social sentiment for predictions. Models are loaded at startup via FastAPI's lifespan and served behind `/v1/predict`, `/v1/patterns/detect`, and `/v1/sentiment` endpoints.

### Mobile App (`apps/mobile/`)

React Native CLI app with a dark glassmorphism theme. Five main tabs: Dashboard, Portfolio, AI Oracle, Market Pulse, and Settings. Real-time price updates via Socket.IO, biometric authentication gate, and Zustand for state management.

### Database

PostgreSQL 16 with TimescaleDB for time-series market data. Hypertables for OHLCV, price ticks, on-chain metrics, and social sentiment with continuous aggregates and automated retention policies.

## License

MIT
