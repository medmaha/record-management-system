import { redirect, fail } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import type { Actions } from './$types';

import DB from '$db';
import { user } from '$db/schema';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const credentials = await request.formData();
		const username = credentials.get('username') as string;
		const password = credentials.get('password') as string;

		const result = await DB.select()
			.from(user)
			.where(sql`username=${username} and password=${password}`);

		if (result.length) {
			const authUser = result[0];

			if (authUser.isActive) {
				cookies.set('sid', JSON.stringify(authUser), {
					httpOnly: true,
					sameSite: 'strict',
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60000 * 30 // 30 minutes
				});
				cookies.set('usr', JSON.stringify(authUser.username), {
					httpOnly: true,
					sameSite: 'strict',
					path: '/',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60000 * 60 * 24 // One Day
				});
				throw redirect(301, '/');
			}

			return fail(403, { username, error: true, message: 'Your account is not active or blocked' });
		}
		return fail(400, { username, error: true, message: 'Invalid credentials! Try again' });
	}
} satisfies Actions;
