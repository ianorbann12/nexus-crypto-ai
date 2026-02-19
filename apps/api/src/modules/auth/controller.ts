import type { FastifyRequest, FastifyReply } from 'fastify';

export class AuthController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement registration
    return reply.code(201).send({ message: 'Register endpoint' });
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement login
    return reply.send({ message: 'Login endpoint' });
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement token refresh
    return reply.send({ message: 'Refresh endpoint' });
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement logout
    return reply.code(204).send();
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    // TODO: Implement get current user
    return reply.send({ message: 'Me endpoint' });
  }
}
