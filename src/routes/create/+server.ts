import DB from '$db';
import { staff, branch } from '$db/schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const url = new URL(request.url).searchParams;

	const models = url.get('models') || '-';
	const fields = url.get('fields') || '-';

	const model_data = models.split('-');
	const field_data = fields.split('-');

	const payloads = {} as any;

	for (let i = 0; i < model_data.length; i++) {
		const model = model_data[i];
		const modelNameFirstLetter = model.split('')[0];

		payloads[model] = [];

		for (let j = 0; j < field_data.length; j++) {
			const field = field_data[j];
			const fieldNameFirstLetter = field.split('')[0];

			if (modelNameFirstLetter === fieldNameFirstLetter) {
				payloads[model].push(field.substring(2));
			}
		}
	}

	async function asyncGet() {
		const results = [] as any;
		return new Promise((resolve) => {
			Object.entries(payloads).forEach(async ([key, value], i) => {
				let model: any;

				switch (key.toLowerCase()) {
					case 'staff':
						model = staff;
						break;
					case 'branch':
						model = branch;
						break;

					default:
						results.push([]);
						return;
				}

				let fields = (value as any[]).reduce((value, elem: any, i) => {
					value = { ...value, [elem]: model[elem] };
					return value;
				}, {});

				results.push(await DB.select(fields).from(model));

				if (i === Object.keys(payloads).length - 1) {
					resolve(results);
				}
			});
		});
	}

	const results = await asyncGet();

	return new Response(JSON.stringify(results), { headers: { 'content-type': 'application/json' } });
};
