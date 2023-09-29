import DB from '$db';
import { staff, branch } from '$db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url).searchParams;

	let results: any[] | undefined;

	if (url.get('query') === 'staffs') {
		results = await DB.query.staff.findMany();
	} else if (url.get('query') === 'transfers') {
		results = await DB.query.transfer.findMany();
	} else if (url.get('query') === 'branches') {
		results = await DB.query.branch.findMany();
	}
	return new Response(JSON.stringify(results || []), {
		headers: {
			'content-type': 'application/json',
			'Cache-Control': 'max-age=300',
			cache: 'force-cache'
		}
	});
};
