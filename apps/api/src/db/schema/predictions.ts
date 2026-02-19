import { pgTable, uuid, varchar, decimal, timestamp, jsonb, pgEnum } from 'drizzle-orm/pg-core';

export const predictionTimeframeEnum = pgEnum('prediction_timeframe', ['1h', '4h', '1d', '7d', '30d']);
export const predictionSignalEnum = pgEnum('prediction_signal', [
  'strong_buy', 'buy', 'neutral', 'sell', 'strong_sell',
]);

export const predictions = pgTable('predictions', {
  id: uuid('id').primaryKey().defaultRandom(),
  asset: varchar('asset', { length: 50 }).notNull(),
  modelId: varchar('model_id', { length: 100 }).notNull(),
  modelVersion: varchar('model_version', { length: 50 }).notNull(),
  timeframe: predictionTimeframeEnum('timeframe').notNull(),
  signal: predictionSignalEnum('signal').notNull(),
  confidence: decimal('confidence', { precision: 5, scale: 4 }).notNull(),
  predictedPrice: decimal('predicted_price', { precision: 30, scale: 18 }).notNull(),
  predictedChangePercent: decimal('predicted_change_percent', { precision: 10, scale: 4 }).notNull(),
  features: jsonb('features').default({}).notNull(),
  actualPrice: decimal('actual_price', { precision: 30, scale: 18 }),
  actualChangePercent: decimal('actual_change_percent', { precision: 10, scale: 4 }),
  accuracy: decimal('accuracy', { precision: 5, scale: 4 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  evaluatedAt: timestamp('evaluated_at', { withTimezone: true }),
});
