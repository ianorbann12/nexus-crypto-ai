import type { FastifyInstance } from 'fastify';
import { AuthController } from './controller';
import { authenticate } from './authenticate';

export async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController(app);

  app.post('/register', controller.register);

  app.post('/login', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    },
  }, controller.login);

  app.post('/refresh', controller.refresh);

  app.post('/logout', {
    preValidation: [authenticate],
  }, controller.logout);

  app.get('/me', {
    preValidation: [authenticate],
  }, controller.me);
}
