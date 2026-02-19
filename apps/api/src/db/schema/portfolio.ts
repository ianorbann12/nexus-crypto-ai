import { pgTable, uuid, varchar, integer, decimal, boolean, timestamp, text, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const holdingSourceEnum = pgEnum('holding_source', ['wallet', 'exchange', 'manual']);

export const transactionTypeEnum = pgEnum('transaction_type', [
  'buy', 'sell', 'transfer', 'swap', 'stake', 'unstake', 'reward',
]);

export const wallets = pgTable('wallets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  address: varchar('address', { length: 255 }).notNull(),
  chainId: integer('chain_id').notNull(),
  label: varchar('label', { length: 100 }).notNull(),
  isWatchOnly: boolean('is_watch_only').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const exchangeConnections = pgTable('exchange_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  exchange: varchar('exchange', { length: 50 }).notNull(),
  apiKeyEncrypted: text('api_key_encrypted').notNull(),
  apiSecretEncrypted: text('api_secret_encrypted').notNull(),
  label: varchar('label', { length: 100 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastSyncAt: timestamp('last_sync_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const holdings = pgTable('holdings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  asset: varchar('asset', { length: 50 }).notNull(),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  amount: decimal('amount', { precision: 30, scale: 18 }).notNull(),
  avgBuyPrice: decimal('avg_buy_price', { precision: 30, scale: 18 }).notNull(),
  source: holdingSourceEnum('source').notNull(),
  sourceId: uuid('source_id'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  asset: varchar('asset', { length: 50 }).notNull(),
  type: transactionTypeEnum('type').notNull(),
  amount: decimal('amount', { precision: 30, scale: 18 }).notNull(),
  price: decimal('price', { precision: 30, scale: 18 }).notNull(),
  fee: decimal('fee', { precision: 30, scale: 18 }).default('0').notNull(),
  feeCurrency: varchar('fee_currency', { length: 20 }).default('USD').notNull(),
  fromAddress: varchar('from_address', { length: 255 }),
  toAddress: varchar('to_address', { length: 255 }),
  txHash: varchar('tx_hash', { length: 255 }),
  chainId: integer('chain_id'),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull(),
});
