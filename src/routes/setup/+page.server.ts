import { sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import DB from '$db';
import { user, staff, branch, address, company } from '$db/schema';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	let stage: 'setup' | 'account' | undefined;

	let account = await DB.query.user.findFirst();
	let app = await DB.query.company.findFirst();

	if (!app) stage = 'setup';

	if (app) {
		cookies.set('app', JSON.stringify(app), {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 5 * 60 // five minutes
		});
	}

	if (!stage) {
		const auth = cookies.get('sid') || '';
		try {
			account = JSON.parse(auth);
		} catch (error) {
			account = await DB.query.user.findFirst();
			stage = 'account';
		}
		if (account) {
			cookies.set('booted', 'true', {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				secure: process.env.NODE_ENV === 'production'
			});
			throw redirect(303, '/login');
		}
	}

	return { app, stage };
};

export const actions: Actions = {
	setup: async ({ cookies, request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const industry = formData.get('industry') as string;
		const headquarters = formData.get('headquarters') as string;
		const date_founded = formData.get('date-founded') as string;

		const newAppCompany: typeof company.$inferInsert = {
			name,
			industry,
			headquarters,
			dateFounded: new Date(date_founded || '') || null
		};

		const existingApp = await DB.query.company.findFirst();

		if (existingApp) {
			return fail(400, { message: 'Software Error' });
		}

		const app = (await DB.insert(company).values(newAppCompany).returning())[0];

		if (app) {
			cookies.set('app', JSON.stringify(app), {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 5 * 60 // five minutes
			});
			return { message: 'Successfully registered your organization!' };
		}

		return { message: '' };
	},
	register: async ({ locals, cookies, request }) => {
		const formData = await request.formData();

		const name = formData.get('name') as string;
		const role = formData.get('role') as string as any;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;
		const phone = formData.get('telephone') as string;

		const existingUsername = (
			await DB.select()
				.from(user)
				.where(sql`username=${username}`)
		)[0];
		if (existingUsername) {
			return fail(400, { message: 'Username already exists', field: 'username' });
		}

		const existingTelephone = (
			await DB.select()
				.from(user)
				.where(sql`phone_number=${phone}`)
		)[0];
		if (existingTelephone) {
			return fail(400, { message: 'Phone Number has already been registered', field: 'telephone' });
		}

		const newUser: typeof user.$inferInsert = {
			name,
			role,
			username,
			password,
			phone,
			isActive: true
		};

		const account = (await DB.insert(user).values(newUser).returning())[0];

		cookies.set('sid', JSON.stringify(account), {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 30 * 60 // 30 minutes
		});
		cookies.set('usr', account.username, {
			httpOnly: true,
			sameSite: 'strict',
			path: '/',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 24 * 60 * 60 // One Day
		});

		await createStaffAndBranch(account, account.id, cookies);
		return { message: 'Registration successful' };
	}
};

async function createStaffAndBranch(account: any, staffId: number, cookies: any) {
	const name = 'Headquarters';
	const newStaff: typeof account.$inferInsert = {
		name: account.name,
		phone: 'N/A',
		gender: 'N/A',
		addressId: 0,
		position: 'HR',
		telephone: 'N/A',
		department: 'N/A'
	};
	const company = JSON.parse(cookies.get('app'));
	const n_staff = await DB.insert(staff).values(newStaff).returning();

	const newAddress: typeof address.$inferInsert = {
		name: ((company || {}) as any).headquarters || '',
		region: 'N/A' as any
	};

	const n_address = await DB.insert(address).values(newAddress).returning();
	const newBranch: typeof branch.$inferInsert = {
		name,
		telephone: 'N/A',
		staffId: n_staff[0].id,
		addressId: n_address[0].id
	};
	const n_branch = await DB.insert(branch).values(newBranch).returning();

	await DB.update(staff)
		.set({ branchId: n_branch[0].id })
		.where(sql`id=${n_staff[0].id}`);
	await DB.update(branch)
		.set({ staffId: null })
		.where(sql`staff_id=${staffId} AND NOT id=${n_branch[0].id}`);
	return true;
}
