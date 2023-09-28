import DB from '$db';
import { company, address } from '$db/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	return {
		company: {} as any
	};
};
