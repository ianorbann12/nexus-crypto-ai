import { z } from 'zod';

export const ohlcvQuery = z.object({
  timeframe: z.string(),
  limit: z.number().int().min(1).max(1000).default(100),
});

export const searchQuery = z.object({
  q: z.string().min(1),
});
