import type { PageServerLoad } from './$types';

import DB from '$db/index';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.authUser;
	const staffs = await DB.query.staff.findMany({
		with: {
			address: true,
			branch: {
				with: { address: true }
			}
		}
	});
	return { user, staffs };
};
