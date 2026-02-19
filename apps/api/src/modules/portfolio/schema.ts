import { z } from 'zod';

export const addWalletBody = z.object({
  address: z.string(),
  chainId: z.number().int(),
  label: z.string(),
});

export const transactionsQuery = z.object({
  asset: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});
