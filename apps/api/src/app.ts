import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { authRoutes } from './modules/auth/routes';
import { userRoutes } from './modules/users/routes';
import { portfolioRoutes } from './modules/portfolio/routes';
import { marketRoutes } from './modules/market/routes';
import { predictionRoutes } from './modules/predictions/routes';
import { alertRoutes } from './modules/alerts/routes';
import { educationRoutes } from './modules/education/routes';
import { db } from './db';
import { redis } from './lib/redis';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

  // Plugins
  await app.register(cors, { origin: true });
  await app.register(jwt, {
    secret: process.env.JWT_ACCESS_SECRET || 'dev-secret',
  });
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Nexus Crypto AI API',
        version: '1.0.0',
        description: 'API gateway for Nexus Crypto AI platform',
      },
      servers: [{ url: `http://localhost:${process.env.API_PORT || 3000}` }],
    },
  });
  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });

  // Decorate with db and redis
  app.decorate('db', db);
  app.decorate('redis', redis);

  // Health check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  // API routes
  await app.register(authRoutes, { prefix: '/v1/auth' });
  await app.register(userRoutes, { prefix: '/v1/users' });
  await app.register(portfolioRoutes, { prefix: '/v1/portfolio' });
  await app.register(marketRoutes, { prefix: '/v1/market' });
  await app.register(predictionRoutes, { prefix: '/v1/predictions' });
  await app.register(alertRoutes, { prefix: '/v1/alerts' });
  await app.register(educationRoutes, { prefix: '/v1/education' });

  return app;
}
