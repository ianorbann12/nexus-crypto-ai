import type { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema, refreshSchema } from './schema';
import { AuthController } from './controller';
import { authenticate } from './authenticate';

export async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController(app);

  app.post('/register', { schema: registerSchema }, controller.register);

  app.post('/login', {
    schema: loginSchema,
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 minute',
      },
    },
  }, controller.login);

  app.post('/refresh', { schema: refreshSchema }, controller.refresh);

  app.post('/logout', {
    preValidation: [authenticate],
  }, controller.logout);

  app.get('/me', {
    preValidation: [authenticate],
  }, controller.me);
}
