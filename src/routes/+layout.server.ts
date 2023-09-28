import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const auth = locals.authUser;
	const app = locals.company || ({} as any);

	return {
		auth,
		app
	};
};
