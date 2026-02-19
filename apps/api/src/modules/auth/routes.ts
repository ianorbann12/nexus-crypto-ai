import type { FastifyInstance } from 'fastify';
import { loginSchema, registerSchema, refreshSchema } from './schema';
import { AuthController } from './controller';

export async function authRoutes(app: FastifyInstance) {
  const controller = new AuthController();

  app.post('/register', { schema: registerSchema }, controller.register);
  app.post('/login', { schema: loginSchema }, controller.login);
  app.post('/refresh', { schema: refreshSchema }, controller.refresh);
  app.post('/logout', controller.logout);
  app.get('/me', controller.me);
}
