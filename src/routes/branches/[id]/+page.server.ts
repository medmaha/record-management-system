import DB from '$db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const branch = await DB.query.branch.findFirst({
		where: sql`id=${id}`,
		with: {
			manager: true,
			address: true
		}
	});

	if (!branch) throw redirect(303, '/404');

	return { branch };
};
