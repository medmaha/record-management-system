import type { PageServerLoad } from './$types';

import DB from '$db';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.authUser;
	const branches = await DB.query.branch.findMany({
		with: {
			manager: {
				with: {
					address: true
				}
			},
			address: true
		}
	});
	return { user, branches };
};
