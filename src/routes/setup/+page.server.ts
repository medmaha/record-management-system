import { sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import DB from '$db';
import { user, company } from '$db/schema';
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
	register: async ({ cookies, request }) => {
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
		return { message: 'Registration successful' };
	}
};
