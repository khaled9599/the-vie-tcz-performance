import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const owner = sqliteTable('owner', { key: text('key').primaryKey(), userId: text('user_id').notNull() });
export const states = sqliteTable('states', { scope: text('scope').primaryKey(), version: integer('version').notNull(), draft: text('draft').notNull(), published: text('published').notNull() });
export const revisions = sqliteTable('revisions', { id: text('id').primaryKey(), scope: text('scope').notNull(), action: text('action').notNull(), reason: text('reason').notNull(), author: text('author').notNull(), timestamp: text('timestamp').notNull(), config: text('config').notNull() });
export const cache = sqliteTable('source_cache', { scope: text('scope').primaryKey(), payload: text('payload').notNull(), timestamp: integer('timestamp').notNull() });
export const limits = sqliteTable('request_limits', { key: text('key').primaryKey(), count: integer('count').notNull() });
