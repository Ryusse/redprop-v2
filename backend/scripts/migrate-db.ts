import "dotenv/config";

import { get } from "env-var";
import { Client } from "pg";

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dbConfig = {
	host: get("POSTGRES_HOST").default("localhost").asString(),
	port: get("POSTGRES_PORT").default(5432).asPortNumber(),
	user: get("POSTGRES_USER").required().asString(),
	password: get("POSTGRES_PASSWORD").required().asString(),
	database: get("POSTGRES_DB").required().asString(),
};

async function migrateDatabase() {
	const client = new Client(dbConfig);

	try {
		console.log("🔌 Conectando a PostgreSQL...");
		console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
		console.log(`   Database: ${dbConfig.database}`);
		console.log(`   User: ${dbConfig.user}`);

		await client.connect();
		console.log("✅ Conexión establecida\n");

		const sqlPath = join(process.cwd(), "src/data/postgres/models/schema.sql");
		console.log(`📄 Leyendo archivo SQL: ${sqlPath}`);

		const sql = readFileSync(sqlPath, "utf-8");

		console.log("📦 Procesando script SQL...\n");

		const cleanSql = sql
			.replace(/--.*$/gm, "")
			.replace(/\/\*[\s\S]*?\*\//g, "");

		const statements = cleanSql
			.split(";")
			.map((stmt) => stmt.trim())
			.filter((stmt) => {
				const trimmed = stmt.trim();
				return (
					trimmed.length > 0 &&
					!trimmed.match(/^\s*$/) &&
					!trimmed.match(/^COMMENT\s+ON/i)
				);
			});

		console.log(`📦 Ejecutando ${statements.length} sentencias SQL...\n`);

		let successCount = 0;
		let skippedCount = 0;
		let errorCount = 0;

		for (let i = 0; i < statements.length; i++) {
			const statement = statements[i];

			if (statement.length === 0) continue;

			try {
				await client.query(statement);
				successCount++;

				const createMatch = statement.match(
					/CREATE\s+(?:TABLE|EXTENSION|INDEX)\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?["']?(\w+)["']?/i,
				);
				const objectName = createMatch ? createMatch[1] : null;

				if (objectName) {
					const type =
						statement.match(/CREATE\s+(\w+)/i)?.[1]?.toLowerCase() || "objeto";
					console.log(
						`   ✅ [${i + 1}/${statements.length}] ${type}: ${objectName}`,
					);
				} else {
					const firstLine =
						statement.split("\n").find((line) => {
							const trimmed = line.trim();
							return trimmed && !trimmed.startsWith("--");
						}) || "";
					const preview =
						firstLine.substring(0, 60).trim() || `Sentencia ${i + 1}`;
					console.log(`   ✅ [${i + 1}/${statements.length}] ${preview}...`);
				}
			} catch (err: unknown) {
				const error = err instanceof Error ? err : new Error("Unknown error");
				const errorMessage = error.message.toLowerCase();
				if (
					errorMessage.includes("already exists") ||
					errorMessage.includes("does not exist") ||
					errorMessage.includes("duplicate key") ||
					errorMessage.includes("duplicate") ||
					errorMessage.includes("cannot be implemented") ||
					(errorMessage.includes("constraint") &&
						errorMessage.includes("already"))
				) {
					skippedCount++;

					const createMatch = statement.match(
						/CREATE\s+(?:TABLE|EXTENSION|INDEX)\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?["']?(\w+)["']?/i,
					);
					const objectName = createMatch ? createMatch[1] : null;

					if (objectName) {
						console.log(
							`   ⚠️  [${i + 1}/${statements.length}] ${objectName} - Ya existe (se ignora)`,
						);
					} else {
						const firstLine =
							statement.split("\n").find((line) => {
								const trimmed = line.trim();
								return trimmed && !trimmed.startsWith("--");
							}) || "";
						const preview =
							firstLine.substring(0, 60).trim() || `Sentencia ${i + 1}`;
						console.log(
							`   ⚠️  [${i + 1}/${statements.length}] ${preview} - Ya existe (se ignora)`,
						);
					}
				} else {
					errorCount++;
					console.error(
						`   ❌ [${i + 1}/${statements.length}] Error:`,
						error.message,
					);
					const preview = statement.substring(0, 200).replace(/\n/g, " ");
					console.error(`   SQL: ${preview}...`);
					throw error;
				}
			}
		}

		console.log(`\n📊 Resumen del schema:`);
		console.log(`   ✅ Exitosas: ${successCount}`);
		if (skippedCount > 0)
			console.log(`   ⚠️  Omitidas (ya existían): ${skippedCount}`);
		if (errorCount > 0) console.log(`   ❌ Errores: ${errorCount}`);

		const migrationsPath = join(process.cwd(), "src/data/postgres/migrations");
		let migrationFiles: string[] = [];

		try {
			migrationFiles = readdirSync(migrationsPath)
				.filter((file) => file.endsWith(".sql"))
				.sort();
		} catch {
			console.log(
				"\n⚠️  No se encontró la carpeta de migraciones, continuando...\n",
			);
		}

		if (migrationFiles.length > 0) {
			console.log(
				`\n📦 Ejecutando ${migrationFiles.length} migración(es) adicional(es)...\n`,
			);

			let migrationSuccess = 0;
			let migrationSkipped = 0;
			let migrationErrors = 0;

			for (const migrationFile of migrationFiles) {
				try {
					const migrationPath = join(migrationsPath, migrationFile);
					console.log(`📄 Ejecutando: ${migrationFile}`);
					const migrationSql = readFileSync(migrationPath, "utf-8");

					await client.query(migrationSql);
					migrationSuccess++;
					console.log(`   ✅ ${migrationFile} ejecutada correctamente\n`);
				} catch (err: unknown) {
					const error = err instanceof Error ? err : new Error("Unknown error");
					const errorMessage = error.message.toLowerCase();
					if (
						errorMessage.includes("already exists") ||
						errorMessage.includes("does not exist") ||
						errorMessage.includes("duplicate")
					) {
						migrationSkipped++;
						console.log(`   ⚠️  ${migrationFile} - Ya aplicada (se ignora)\n`);
					} else {
						migrationErrors++;
						console.error(`   ❌ Error en ${migrationFile}:`, error.message);
						throw error;
					}
				}
			}

			console.log(`📊 Resumen de migraciones:`);
			console.log(`   ✅ Exitosas: ${migrationSuccess}`);
			if (migrationSkipped > 0)
				console.log(`   ⚠️  Omitidas: ${migrationSkipped}`);
			if (migrationErrors > 0) console.log(`   ❌ Errores: ${migrationErrors}`);
		}

		console.log("\n✅ Base de datos montada correctamente!");
		console.log("🎉 Todas las tablas y migraciones han sido aplicadas.\n");
	} catch (error: unknown) {
		console.error("\n❌ Error al montar la base de datos:");
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(errorMessage);
		process.exit(1);
	} finally {
		await client.end();
		console.log("🔌 Conexión cerrada");
	}
}

migrateDatabase();
