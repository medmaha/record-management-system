import DB from '$db';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await DB.query.user.findMany({
		columns: {
			id: true,
			role: true,
			name: true,
			username: true,
			phone: true
		}
	});

	return { users };
};
