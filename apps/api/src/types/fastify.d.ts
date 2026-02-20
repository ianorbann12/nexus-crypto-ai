import type { db } from '../db';
import type Redis from 'ioredis';

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof db;
    redis: Redis;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; email: string; username: string };
    user: { sub: string; email: string; username: string };
  }
}
