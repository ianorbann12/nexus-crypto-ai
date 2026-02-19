import { createWorker } from '../lib/queue';

export const alertEvaluationWorker = createWorker('alert-evaluation', async (job) => {
  // TODO: Evaluate alert conditions against current prices
  console.log('Alert evaluation job:', job.data);
});
