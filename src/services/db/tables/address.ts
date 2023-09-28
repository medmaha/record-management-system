import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// All Addresses of this companies employees
export const address = pgTable('addresses', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	region: text('region', { enum: ['WCR', 'NBR', 'LRR', 'CRR', 'UPP', 'BJL'] }).notNull()
});
