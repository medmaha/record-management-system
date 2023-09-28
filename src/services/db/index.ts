import {
	PG_DATABASE,
	PG_HOST,
	PG_PASSWORD,
	PG_PORT,
	PG_USER,
	PG_DATABASE_URL
} from '$env/static/private';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import pkg from 'pg';
const { Client } = pkg;

import * as schema from './schema';

// const client = new Client({
// 	connectionString: PG_DATABASE_URL
// });

const client = new Client({
	host: PG_HOST,
	user: PG_USER,
	password: PG_PASSWORD,
	database: PG_DATABASE,
	port: Number(PG_PORT)
});

await client.connect();
const DB = drizzle(client, { schema });

if (client) {
	await migrate(DB, { migrationsFolder: './drizzle' });
	console.log('Database Booted 🚀🚀🚀');
}

export default DB;
