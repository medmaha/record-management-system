import DB from '$db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	const staff = await DB.query.staff.findFirst({ where: sql`id=${id}` });

	if (!staff) throw redirect(303, '/404');

	return { staff };
};
