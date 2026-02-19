import { z } from 'zod';

export const updateProfileBody = z.object({
  username: z.string().min(3).max(50).optional(),
  avatarUrl: z.string().url().optional(),
});
