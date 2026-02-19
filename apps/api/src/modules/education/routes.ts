import type { FastifyInstance } from 'fastify';

export async function educationRoutes(app: FastifyInstance) {
  app.get('/content', async (request, reply) => {
    return reply.send({ message: 'List content endpoint' });
  });

  app.get('/content/:slug', async (request, reply) => {
    return reply.send({ message: 'Get content endpoint' });
  });

  app.post('/progress/:contentId', async (request, reply) => {
    return reply.send({ message: 'Update progress endpoint' });
  });

  app.get('/progress', async (request, reply) => {
    return reply.send({ message: 'Get progress endpoint' });
  });
}
