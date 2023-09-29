import DB from '$db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { username } = params;
	const user = locals.authUser;
	const account = await DB.query.user.findFirst({
		where: sql`username=${username}`,
		columns: {
			id: false,
			password: false,
			updatedAt: false
		}
	});

	if (!account) throw redirect(303, '/404');

	return { user, account };
};
