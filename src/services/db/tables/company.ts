import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const company = pgTable('company', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	industry: text('industry').notNull(),
	headquarters: text('headquarters').notNull(),
	dateFounded: timestamp('date_founded', { mode: 'date', withTimezone: true }).defaultNow()
});
