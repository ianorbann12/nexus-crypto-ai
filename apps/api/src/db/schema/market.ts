import { pgTable, varchar, decimal, integer, timestamp, bigint } from 'drizzle-orm/pg-core';

export const marketOhlcv = pgTable('market_ohlcv', {
  asset: varchar('asset', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  open: decimal('open', { precision: 30, scale: 18 }).notNull(),
  high: decimal('high', { precision: 30, scale: 18 }).notNull(),
  low: decimal('low', { precision: 30, scale: 18 }).notNull(),
  close: decimal('close', { precision: 30, scale: 18 }).notNull(),
  volume: decimal('volume', { precision: 30, scale: 8 }).notNull(),
  source: varchar('source', { length: 50 }).notNull(),
});

export const priceTicks = pgTable('price_ticks', {
  asset: varchar('asset', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  price: decimal('price', { precision: 30, scale: 18 }).notNull(),
  volume24h: decimal('volume_24h', { precision: 30, scale: 8 }),
  marketCap: decimal('market_cap', { precision: 30, scale: 8 }),
  source: varchar('source', { length: 50 }).notNull(),
});

export const onChainMetrics = pgTable('on_chain_metrics', {
  asset: varchar('asset', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  activeAddresses: integer('active_addresses'),
  transactionCount: integer('transaction_count'),
  avgTransactionValue: decimal('avg_transaction_value', { precision: 30, scale: 18 }),
  hashRate: bigint('hash_rate', { mode: 'number' }),
  totalValueLocked: decimal('total_value_locked', { precision: 30, scale: 8 }),
  source: varchar('source', { length: 50 }).notNull(),
});

export const socialSentiment = pgTable('social_sentiment', {
  asset: varchar('asset', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  sentimentScore: decimal('sentiment_score', { precision: 5, scale: 4 }).notNull(),
  volume: integer('volume').notNull(),
  positiveCount: integer('positive_count').notNull(),
  negativeCount: integer('negative_count').notNull(),
  neutralCount: integer('neutral_count').notNull(),
});
