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

const PORT = Number(PG_PORT);

let client: any | undefined;
let DB: NodePgDatabase<typeof schema>;

try {
	const _client = client || new Client(PG_DATABASE_URL);
	// new Client({
	// 	host: PG_HOST,
	// 	port: PORT,
	// 	user: PG_USER,
	// 	password: PG_PASSWORD,
	// 	database: PG_DATABASE
	// });

	// @ts-ignore
	DB = DB || drizzle(_client, { schema });

	if (!client) {
		await _client.connect();
		await migrate(DB, { migrationsFolder: './drizzle' });
	}
	client = _client;
	console.log('Database System Booted 💨🚀');
} catch {
	throw new Error('[ERROR] Database connection failed');
}

export default DB;
