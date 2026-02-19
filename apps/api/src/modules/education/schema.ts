import { z } from 'zod';

export const contentQuery = z.object({
  category: z.enum(['basics', 'trading', 'defi', 'security', 'technical_analysis', 'ai_ml']).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
});
