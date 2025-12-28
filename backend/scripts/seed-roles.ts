import "dotenv/config";

import { get } from "env-var";

import { PostgresDatabase } from "../src/data/postgres/database";
import { RoleModel } from "../src/data/postgres/models/users/role.model";

const dbConfig = {
	host: get("POSTGRES_HOST").default("localhost").asString(),
	port: get("POSTGRES_PORT").default(5432).asPortNumber(),
	user: get("POSTGRES_USER").required().asString(),
	password: get("POSTGRES_PASSWORD").required().asString(),
	database: get("POSTGRES_DB").required().asString(),
};

const roles = ["admin", "agent"];

async function seedRoles() {
	try {
		console.log("🔌 Connecting to database...");
		console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
		console.log(`   Database: ${dbConfig.database}`);
		console.log(`   User: ${dbConfig.user}\n`);

		await PostgresDatabase.connect({
			dbName: dbConfig.database,
			port: dbConfig.port,
			host: dbConfig.host,
			user: dbConfig.user,
			password: dbConfig.password,
		});

		console.log("✅ Connection established\n");

		console.log("📦 Seeding roles in database...\n");

		let createdCount = 0;
		let existingCount = 0;

		for (const roleName of roles) {
			try {
				const existingRole = await RoleModel.findByName(roleName);

				if (existingRole) {
					console.log(
						`   ⚠️  "${roleName}" - Already exists (ID: ${existingRole.id})`,
					);
					existingCount++;
				} else {
					const newRole = await RoleModel.create({ name: roleName });
					console.log(`   ✅ "${roleName}" - Created (ID: ${newRole.id})`);
					createdCount++;
				}
			} catch (error: unknown) {
				const errorMessage =
					error instanceof Error ? error.message : "Unknown error";
				console.error(`   ❌ Error creating "${roleName}": ${errorMessage}`);
			}
		}

		console.log(`\n📊 Summary:`);
		console.log(`   ✅ Created: ${createdCount}`);
		console.log(`   ⚠️  Already existed: ${existingCount}`);
		console.log(`   📋 Total: ${roles.length}\n`);

		const allRoles = await RoleModel.findAll();
		console.log("📋 Roles in database:");
		allRoles.forEach((role, index) => {
			console.log(`   ${index + 1}. ${role.name} (ID: ${role.id})`);
		});
		console.log("");

		console.log("✅ Process completed successfully!\n");
	} catch (error: unknown) {
		console.error("\n❌ Error seeding roles:");
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(errorMessage);
		process.exit(1);
	} finally {
		await PostgresDatabase.disconnect();
	}
}

seedRoles();
