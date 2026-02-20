import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import type { z } from 'zod';
import { AuthService, AuthError } from './service';
import type { loginBody, registerBody, refreshBody } from './schema';

type LoginBody = z.infer<typeof loginBody>;
type RegisterBody = z.infer<typeof registerBody>;
type RefreshBody = z.infer<typeof refreshBody>;

export class AuthController {
  private service: AuthService;

  constructor(app: FastifyInstance) {
    this.service = new AuthService(app);
  }

  register = async (
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const { email, username, password } = request.body;
      const result = await this.service.register(email, username, password);
      return reply.code(201).send({
        user: result.user,
        tokens: { accessToken: result.accessToken, refreshToken: result.refreshToken },
      });
    } catch (err) {
      return this.handleError(err, reply);
    }
  };

  login = async (
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const { email, password } = request.body;
      const result = await this.service.login(email, password);
      return reply.send({
        user: result.user,
        tokens: { accessToken: result.accessToken, refreshToken: result.refreshToken },
      });
    } catch (err) {
      return this.handleError(err, reply);
    }
  };

  refresh = async (
    request: FastifyRequest<{ Body: RefreshBody }>,
    reply: FastifyReply,
  ) => {
    try {
      const { refreshToken } = request.body;
      const tokens = await this.service.refresh(refreshToken);
      return reply.send(tokens);
    } catch (err) {
      return this.handleError(err, reply);
    }
  };

  logout = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await this.service.logout(request.user.sub);
      return reply.code(204).send();
    } catch (err) {
      return this.handleError(err, reply);
    }
  };

  me = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = await this.service.getUserById(request.user.sub);
      return reply.send(user);
    } catch (err) {
      return this.handleError(err, reply);
    }
  };

  private handleError(err: unknown, reply: FastifyReply) {
    if (err instanceof AuthError) {
      return reply.code(err.statusCode).send({
        statusCode: err.statusCode,
        error: err.name,
        message: err.message,
      });
    }
    throw err;
  }
}
