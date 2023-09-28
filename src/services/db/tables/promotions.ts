import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const promotion = pgTable('promotion', {
	role: text('role').notNull(),
	newRole: text('new_role').notNull(),
	remarks: text('remarks').notNull(),
	receiptId: integer('receipt_id'),
	promotionDate: timestamp('promotion_date', { mode: 'date', withTimezone: true })
});
