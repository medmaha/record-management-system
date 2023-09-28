import DB from '$db/index';

import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const staffs = await DB.query.staff.findMany({
		with: {
			address: true,
			branch: {
				with: { address: true }
			}
		}
	});
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

	return { staffs, branches, user: locals.authUser };
};

export const actions: Actions = {
	query: async ({ cookies, request }) => {
		const formData = await request.formData();

		const query = formData.get('query') as string;

		return { query, results: { success: true, data: [] } };
	}
} satisfies Actions;
