import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum, decimal } from 'drizzle-orm/pg-core';
import { users } from './users';

export const contentCategoryEnum = pgEnum('content_category', [
  'basics', 'trading', 'defi', 'security', 'technical_analysis', 'ai_ml',
]);
export const contentDifficultyEnum = pgEnum('content_difficulty', [
  'beginner', 'intermediate', 'advanced',
]);

export const educationContent = pgTable('education_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  category: contentCategoryEnum('category').notNull(),
  difficulty: contentDifficultyEnum('difficulty').notNull(),
  body: text('body').notNull(),
  estimatedMinutes: integer('estimated_minutes').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  contentId: uuid('content_id').notNull().references(() => educationContent.id, { onDelete: 'cascade' }),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  quizScore: decimal('quiz_score', { precision: 5, scale: 2 }),
});
