import { z } from 'zod';

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerBody = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

export const refreshBody = z.object({
  refreshToken: z.string(),
});

export const loginSchema = { body: loginBody };
export const registerSchema = { body: registerBody };
export const refreshSchema = { body: refreshBody };
