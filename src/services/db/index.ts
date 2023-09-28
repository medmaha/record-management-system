import {
	PG_DATABASE,
	PG_HOST,
	PG_PASSWORD,
	PG_PORT,
	PG_USER,
	PG_DATABASE_URL
} from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

const boot = () => {
	const client = postgres({
		host: PG_HOST,
		user: PG_USER,
		password: PG_PASSWORD,
		database: PG_DATABASE,
		port: Number(PG_PORT)
	});
	const DB = drizzle(client, { schema });

	// await migrate(DB, { migrationsFolder: './drizzle' });

	console.log('Database Booted 🚀🚀🚀');

	return DB;
};

const DB = boot();

export default DB;

// const { Client } = pkg;
// const client = new Client({
// 	host: PG_HOST,
// 	user: PG_USER,
// 	password: PG_PASSWORD,
// 	database: PG_DATABASE,
// 	port: Number(PG_PORT)
// });

// await client.connect();
// const DB = drizzle(client, { schema });
