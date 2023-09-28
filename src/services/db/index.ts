import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

import * as schema from './schema';

import {
	PG_DATABASE,
	PG_HOST,
	PG_PASSWORD,
	PG_PORT,
	PG_USER,
	PG_DATABASE_URL
} from '$env/static/private';

const boot = async () => {
	const dbClient = postgres({
		host: PG_HOST,
		user: PG_USER,
		password: PG_PASSWORD,
		database: PG_DATABASE,
		port: Number(PG_PORT)
	});
	const DB = drizzle(dbClient, { schema });

	await migrate(DB, { migrationsFolder: './drizzle' });

	return { DB, dbClient };
};

const app = await boot();

const DB = app.DB;
console.log('Database Booted 🚀🚀🚀');

export default DB;
