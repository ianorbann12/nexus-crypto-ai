import { z } from 'zod';

export const createAlertBody = z.object({
  asset: z.string(),
  type: z.enum(['price', 'percentage_change', 'volume', 'prediction', 'portfolio']),
  condition: z.enum(['above', 'below', 'crosses']),
  targetValue: z.number(),
  message: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});
