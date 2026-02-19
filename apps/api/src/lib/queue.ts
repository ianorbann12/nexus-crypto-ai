import { Queue, Worker } from 'bullmq';

const redisConnection = {
  host: new URL(process.env.REDIS_URL || 'redis://localhost:6379').hostname,
  port: parseInt(new URL(process.env.REDIS_URL || 'redis://localhost:6379').port || '6379', 10),
};

export const priceIngestionQueue = new Queue('price-ingestion', { connection: redisConnection });
export const portfolioSyncQueue = new Queue('portfolio-sync', { connection: redisConnection });
export const alertEvaluationQueue = new Queue('alert-evaluation', { connection: redisConnection });

export function createWorker(
  queueName: string,
  processor: (job: { data: Record<string, unknown> }) => Promise<void>,
) {
  return new Worker(queueName, processor, { connection: redisConnection });
}
