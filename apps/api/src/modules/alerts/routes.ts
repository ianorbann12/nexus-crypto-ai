import type { FastifyInstance } from 'fastify';

export async function alertRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    return reply.send({ message: 'List alerts endpoint' });
  });

  app.post('/', async (request, reply) => {
    return reply.code(201).send({ message: 'Create alert endpoint' });
  });

  app.patch('/:id', async (request, reply) => {
    return reply.send({ message: 'Update alert endpoint' });
  });

  app.delete('/:id', async (request, reply) => {
    return reply.code(204).send();
  });
}
