import { sql } from 'drizzle-orm';

import DB from '$db/index';
import { address, branch, company, staff, transfer, receipt } from '$db/schema';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const model = url.searchParams.get('model');
	return { model };
};

const insertRecord = async (table: any, data: any) => {
	return await DB.insert(table).values(data).returning();
};

type NewCity = typeof address.$inferInsert;
type NewBranch = typeof branch.$inferInsert;
type NewManager = typeof staff.$inferInsert;
type NewCompany = typeof company.$inferInsert;
type NewTransfer = typeof transfer.$inferInsert;

export const actions: Actions = {
	createStaff: async ({ request, locals }) => {
		const authUser = locals.authUser;

		const formData = await request.formData();

		const name = formData.get('name')! as string;
		const gender = formData.get('gender')! as string;
		const position = formData.get('position')! as string;
		const telephone = formData.get('telephone')! as string;
		const department = formData.get('department')! as string;
		const addressName = formData.get('address')! as string;
		const addressRegion = formData.get('region')! as string;

		type NewStaff = typeof staff.$inferInsert;
		type NewReceipt = typeof receipt.$inferInsert;

		const staffAddress = await getAddress(addressName, addressRegion);

		const newStaff: NewStaff = {
			name,
			gender,
			position,
			department,
			telephone,
			branchId: 0,
			addressId: staffAddress.id
		};

		const existingStaff = await DB.select()
			.from(staff)
			.where(sql`name=${name} and gender=${newStaff.gender} and branch_id=${newStaff.branchId}`);

		if (existingStaff.length) {
			return {
				success: false,
				error: true,
				message: 'A manager with this name and gender already exist'
			};
		}

		const newReceipt: NewReceipt = {
			usedFor: '[STAFF-CREATION] name=' + name,
			createdByUserId: Number(authUser.id)
		};

		const _receipt = (await insertRecord(receipt, newReceipt))[0];
		newStaff.receiptId = _receipt.id;

		try {
			await insertRecord(staff, newStaff);
			return { success: true, message: 'Successfully inserted manager data' };
		} catch (_) {
			DB.delete(receipt).where(sql`id=${_receipt.id}`);
			return { error: true, message: 'An Unexpected Error Account' };
		}
	},

	createBranch: async ({ request, locals }) => {
		const authUser = locals.authUser;
		const formData = await request.formData();

		const name = formData.get('name')! as string;
		const staffId = formData.get('manager-id')! as string;

		const addressName = formData.get('address')! as string;
		const addressRegion = formData.get('region')! as string;
		const telephone = formData.get('telephone')! as string;

		const branchManager = (
			await DB.select()
				.from(staff)
				.where(sql`id=${staffId}`)
		)[0];

		if (!branchManager) return { error: true, message: 'Invalid manager selected for this branch' };

		const newBranch: NewBranch = {
			name,
			telephone,
			staffId: branchManager.id,
			addressId: (await getAddress(addressName, addressRegion)).id
		};

		const existingBranch = (
			await DB.select()
				.from(branch)
				.where(
					sql`name=${name} and address_id=${newBranch.addressId} and staff_id=${newBranch.staffId}`
				)
		)[0];

		if (existingBranch) {
			return fail(400, { error: true, message: 'This branch already exist' });
		}

		const newReceipt: any = {
			usedFor: '[BRANCH-CREATION] name=' + name,
			createdByUserId: Number(authUser.id)
		};

		const _receipt = (await insertRecord(receipt, newReceipt))[0];
		newBranch.receiptId = _receipt.id;

		const n_b = await insertRecord(branch, newBranch);

		await DB.update(staff)
			.set({ branchId: n_b[0].id })
			.where(sql`id=${staffId}`);
		await DB.update(branch)
			.set({ staffId: null })
			.where(sql`staff_id=${staffId} AND NOT id=${n_b[0].id}`);

		return { success: true, message: 'Successfully inserted branch data' };
	},

	createTransfer: async ({ request }) => {
		const formData = await request.formData();

		const fb_i = formData.get('from-branch-id') as any;

		const staffID = (formData.get('staff-id')! as string) || '0';
		const toBranchID = (formData.get('to-branch-id')! as string) || '0';
		const fromBranchID = fb_i && !isNaN(Number(fb_i)) ? Number(fb_i) : null;

		const remarks = (formData.get('remarks')! as string) || '';

		const transferToBranch = await DB.select()
			.from(branch)
			.where(sql`id=${toBranchID}`);

		let transferFromBranch: any;

		if (fromBranchID)
			transferFromBranch = await DB.select()
				.from(branch)
				.where(sql`id=${fromBranchID}`);

		if (!transferToBranch.length)
			return { success: false, error: true, message: '[Error] form contains error' };

		const transferStaff = await DB.select()
			.from(staff)
			.where(sql`id=${staffID}`);

		if (!transferStaff.length)
			return { success: false, error: true, message: 'Invalid staff selected for this transfer' };

		const newTransfer: NewTransfer = {
			toBranchId: Number(toBranchID),
			fromBranchId: fromBranchID,
			staffId: Number(staffID),
			transfer_remarks: remarks
		};

		await insertRecord(transfer, newTransfer);
		await DB.update(staff)
			.set({ branchId: Number(toBranchID) })
			.where(sql`id=${staffID}`);

		return { success: true, error: false, message: 'Successfully inserted transfer data' };
	}
} satisfies Actions;

async function getAddress(name: string, region: string) {
	const newAddress: NewCity = {
		name: name,
		region: region.toUpperCase() as any
	};

	const existingAddress = (
		await DB.select()
			.from(address)
			.where(sql`name=${newAddress.name} and region=${newAddress.region}`)
	)[0];

	if (existingAddress) {
		newAddress.id = existingAddress.id;
	} else {
		newAddress.id = (await insertRecord(address, newAddress))[0].id;
	}

	return newAddress;
}
