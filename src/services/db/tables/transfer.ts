import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const transfer = pgTable('transfers', {
	id: serial('id').primaryKey(),
	fromBranchId: integer('from_branch_id'),
	toBranchId: integer('to_branch_id'),
	staffIdId: integer('manager_id'),
	receiptId: integer('receipt_id'),
	transfer_remarks: text('transfer_remarks').default(''),
	transferDate: timestamp('transfer_date', { mode: 'date', withTimezone: true }).defaultNow()
});
