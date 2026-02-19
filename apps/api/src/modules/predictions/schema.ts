import { z } from 'zod';

export const predictionBody = z.object({
  asset: z.string(),
  timeframe: z.enum(['1h', '4h', '1d', '7d', '30d']),
});
