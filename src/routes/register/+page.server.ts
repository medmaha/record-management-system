import { sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import DB from '$db';
import { user } from '$db/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.authUser;

	return { user };
};

export const actions: Actions = {
	register: async ({ request }) => {
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

		await DB.insert(user).values(newUser);

		return { message: 'Registration successful' };
	}
};
