import { createWorker } from '../lib/queue';

export const portfolioSyncWorker = createWorker('portfolio-sync', async (job) => {
  // TODO: Sync wallet balances and exchange positions
  console.log('Portfolio sync job:', job.data);
});
