import type { FastifyInstance } from 'fastify';

export async function marketRoutes(app: FastifyInstance) {
  app.get('/overview', async (request, reply) => {
    return reply.send({ message: 'Market overview endpoint' });
  });

  app.get('/price/:asset', async (request, reply) => {
    return reply.send({ message: 'Price endpoint' });
  });

  app.get('/ohlcv/:asset', async (request, reply) => {
    return reply.send({ message: 'OHLCV endpoint' });
  });

  app.get('/search', async (request, reply) => {
    return reply.send({ message: 'Search endpoint' });
  });
}
