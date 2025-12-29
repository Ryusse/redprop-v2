import {
	Pool,
	type PoolClient,
	type QueryResult,
	type QueryResultRow,
} from "pg";

import { envs } from "../../config/envs";
import type { SqlParams } from "../types/sql.types";

interface Options {
	dbName: string;
	port: number;
	host: string;
	user: string;
	password: string;
}

export class PostgresDatabase {
	private static pool: Pool | null = null;

	static async connect(options: Options): Promise<void> {
		const { dbName, port, host, user, password } = options;

		PostgresDatabase.pool = new Pool({
			database: dbName,
			port: port,
			host: host,
			user: user,
			password: password,
			max: envs.DB_POOL_MAX,
			min: envs.DB_POOL_MIN,
			idleTimeoutMillis: envs.DB_POOL_IDLE_TIMEOUT,
			connectionTimeoutMillis: envs.DB_POOL_CONNECTION_TIMEOUT,
			allowExitOnIdle: false,
		});

		PostgresDatabase.pool.on("error", (err) => {
			console.error("❌ Error inesperado en cliente inactivo del pool:", err);
		});

		try {
			const testClient = await PostgresDatabase.pool.connect();
			testClient.release();
			console.log(
				`✅ Connection pool establecido correctamente (max: ${envs.DB_POOL_MAX}, min: ${envs.DB_POOL_MIN})`,
			);
		} catch (error) {
			console.error("❌ Error al establecer connection pool:", error);
			if (PostgresDatabase.pool) {
				await PostgresDatabase.pool.end();
				PostgresDatabase.pool = null;
			}
			throw error;
		}
	}

	static async disconnect(): Promise<void> {
		if (PostgresDatabase.pool) {
			await PostgresDatabase.pool.end();
			PostgresDatabase.pool = null;
			console.log("🔌 Connection pool cerrado");
		}
	}

	static getPool(): Pool {
		if (!PostgresDatabase.pool) {
			throw new Error(
				"No hay pool activo a PostgreSQL. Debes llamar a connect() primero.",
			);
		}
		return PostgresDatabase.pool;
	}

	static async query<T extends QueryResultRow = QueryResultRow>(
		text: string,
		params?: SqlParams,
	): Promise<QueryResult<T>> {
		if (!PostgresDatabase.pool) {
			throw new Error(
				"No hay pool activo a PostgreSQL. Debes llamar a connect() primero.",
			);
		}
		return await PostgresDatabase.pool.query(text, params);
	}

	static async getPoolClient(): Promise<PoolClient> {
		if (!PostgresDatabase.pool) {
			throw new Error(
				"No hay pool activo a PostgreSQL. Debes llamar a connect() primero.",
			);
		}
		return await PostgresDatabase.pool.connect();
	}

	static getClient(): Pool {
		return PostgresDatabase.getPool();
	}
}
