import { relations } from 'drizzle-orm';
import { address } from './address';
import { branch } from './branch';
import { staff } from './staffs';
import { integer, pgTable } from 'drizzle-orm/pg-core';

export const branchStaffs = pgTable('staffs_branch', {
	staffId: integer('staff_id')
		.notNull()
		.references(() => staff.id),
	branchId: integer('branch_id')
		.notNull()
		.references(() => branch.id)
});

export const staffRelations = relations(staff, ({ one }) => ({
	address: one(address, {
		fields: [staff.addressId],
		references: [address.id]
	}),
	branch: one(branch, {
		fields: [staff.branchId],
		references: [branch.id]
	})
}));

export const branchRelations = relations(branch, ({ one }) => ({
	address: one(address, {
		fields: [branch.addressId],
		references: [address.id]
	}),
	manager: one(staff, {
		fields: [branch.staffId],
		references: [staff.id]
	})
}));
