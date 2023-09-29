import DB from '$db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const user = await DB.query.user.findFirst({
		where: sql`id=${id}`,
		columns: {
			id: true,
			role: true,
			name: true,
			username: true,
			phone: true
		}
	});

	if (!user) throw redirect(303, '/404');

	return { user };
};
