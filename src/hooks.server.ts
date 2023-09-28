import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import DB from '$db';

import { user } from '$db/schema';

const error_response = `
	<br> <br> <br>
	<p style="text-align:center;color:red">[Oops] something went wrong!</p>
	<h1 style="text-align:center;color:#444"> An Error occurred because the software has been tampered</h1>
`;

function clearAuthCookies(event: any) {
	event.cookies.delete('sid');
	event.cookies.delete('app');
	event.cookies.delete('usr');
}

export const handle: Handle = async ({ event, resolve }) => {
	const BOOTED = event.cookies.get('booted') as any;

	if (!BOOTED && !event.url.pathname.match(/\/setup/gi)) throw redirect(303, '/setup');

	if (event.url.pathname.match(/\/setup/gi)) {
		const response = await resolve(event);
		return response;
	}

	let app = event.cookies.get('app') as any;

	if (!app) {
		app = await DB.query.company.findFirst();

		if (app) {
			event.cookies.set('app', JSON.stringify(app), {
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60000 * 5 // five minutes
			});
		} else {
			clearAuthCookies(event);
			return new Response(error_response, {
				headers: { 'Content-Type': 'text/html' }
			});
		}
	} else {
		try {
			app = JSON.parse(app);
			event.locals.company = app;
		} catch (error) {
			clearAuthCookies(event);
			return new Response(error_response, {
				headers: { 'Content-Type': 'text/html' }
			});
		}
	}

	const logoutRoute = event.url.pathname.match(/\/logout/);

	if (logoutRoute) {
		clearAuthCookies(event);
		throw redirect(302, '/login');
	}

	let auth = event.cookies.get('sid');

	if (!auth) {
		let username = event.cookies.get('usr');

		if (username) {
			const account = (
				await DB.select()
					.from(user)
					.where(sql`username=${username}`)
			)[0];

			if (account) {
				auth = JSON.stringify(account);
			}
		}
	}

	const inLoginPage = event.url.pathname.match(/\/login/gi);

	if (auth && inLoginPage) {
		throw redirect(302, '/');
	}

	if (!auth && !inLoginPage) {
		throw redirect(302, '/login');
	}

	if (auth && !inLoginPage) {
		try {
			const user = JSON.parse(auth);
			event.locals.authUser = user;
		} catch (error) {}
	}

	const authUser = event.locals.authUser;
	const protected_routes = ['/create', '/register'];

	for (const route of protected_routes) {
		if (event.url.pathname.match(new RegExp(route, 'ig'))) {
			if (!['hr', 'superuser'].includes(authUser.role.toLowerCase())) {
				const error_response = `
					<br> <br> <br>
					<p style="text-align:center;color:red">[Oops] something went wrong!</p>
					<h1 style="text-align:center;color:#444"> You dont't have permission to this page</h1>
					<div style="text-align:center;color:skyBlue;margin-top:1rem">
						<a href="/" style="text-align:center;color:blue;"> Go back Instead</h>
					</div>
				`;
				return new Response(error_response, {
					headers: { 'Content-Type': 'text/html' }
				});
			}
			break;
		}
	}
	// if (event.request.method.toLowerCase() !== 'get') {
	// }

	const response = await resolve(event);
	return response;
};
