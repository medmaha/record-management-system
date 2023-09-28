import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const receipt = pgTable('receipts', {
	id: serial('id').primaryKey(),
	usedFor: text('used_for'),
	createdByUserId: integer('created_by_user_id').notNull(),
	timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }).defaultNow()
});
