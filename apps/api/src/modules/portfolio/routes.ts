import type { FastifyInstance } from 'fastify';

export async function portfolioRoutes(app: FastifyInstance) {
  app.get('/summary', async (request, reply) => {
    return reply.send({ message: 'Portfolio summary endpoint' });
  });

  app.get('/wallets', async (request, reply) => {
    return reply.send({ message: 'Wallets endpoint' });
  });

  app.post('/wallets', async (request, reply) => {
    return reply.code(201).send({ message: 'Add wallet endpoint' });
  });

  app.delete('/wallets/:id', async (request, reply) => {
    return reply.code(204).send();
  });

  app.get('/holdings', async (request, reply) => {
    return reply.send({ message: 'Holdings endpoint' });
  });

  app.get('/transactions', async (request, reply) => {
    return reply.send({ message: 'Transactions endpoint' });
  });

  app.post('/sync', async (request, reply) => {
    return reply.send({ message: 'Portfolio sync endpoint' });
  });
}
