import DB from '$db';
import { staff, branch } from '$db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url).searchParams;

	if (url.get('query') === 'staffs') {
		const response = await DB.query.staff.findMany();
		return new Response(JSON.stringify(response), {
			headers: { 'content-type': 'application/json' }
		});
	}
	if (url.get('query') === 'transfers') {
		const response = await DB.query.transfer.findMany();

		return new Response(JSON.stringify(response), {
			headers: { 'content-type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({}), { headers: { 'content-type': 'application/json' } });
};
