import { createWorker } from '../lib/queue';

export const priceIngestionWorker = createWorker('price-ingestion', async (job) => {
  // TODO: Fetch prices from CoinGecko/Binance, store in TimescaleDB
  console.log('Price ingestion job:', job.data);
});
