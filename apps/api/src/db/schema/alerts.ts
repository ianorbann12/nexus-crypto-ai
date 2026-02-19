import { pgTable, uuid, varchar, decimal, timestamp, text, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const alertTypeEnum = pgEnum('alert_type', [
  'price', 'percentage_change', 'volume', 'prediction', 'portfolio',
]);
export const alertConditionEnum = pgEnum('alert_condition', ['above', 'below', 'crosses']);
export const alertStatusEnum = pgEnum('alert_status', ['active', 'triggered', 'expired', 'disabled']);

export const alerts = pgTable('alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  asset: varchar('asset', { length: 50 }).notNull(),
  type: alertTypeEnum('type').notNull(),
  condition: alertConditionEnum('condition').notNull(),
  targetValue: decimal('target_value', { precision: 30, scale: 18 }).notNull(),
  currentValue: decimal('current_value', { precision: 30, scale: 18 }),
  status: alertStatusEnum('status').default('active').notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  triggeredAt: timestamp('triggered_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
