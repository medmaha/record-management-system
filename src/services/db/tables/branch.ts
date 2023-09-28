import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const branch = pgTable('branches', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	managerId: integer('staff_id'),
	receiptId: integer('receipt_id'),
	addressId: integer('address_id'),
	telephone: text('telephone').notNull(),
	date_opened: timestamp('date_opened', { mode: 'date', withTimezone: true }).defaultNow()
});
