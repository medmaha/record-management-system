import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').notNull(),
	password: text('password').notNull(),
	phone: text('phone_number').default('+220 '),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow(),
	role: text('role', { enum: ['Read', 'Staff', 'Superuser', 'Manager'] }).default('Read'),
	receiptId: integer('receipt_id')
});
