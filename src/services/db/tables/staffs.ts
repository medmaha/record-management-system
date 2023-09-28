import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const staff = pgTable('staffs', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	position: text('position'),
	department: text('department'),
	gender: text('gender'),
	telephone: text('telephone'),
	branchId: integer('branch_id'),
	addressId: integer('address_id'),
	receiptId: integer('receipt_id'),
	date_hired: timestamp('date_hired', { mode: 'date', withTimezone: true }).defaultNow()
});
