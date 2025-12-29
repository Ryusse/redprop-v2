import "dotenv/config";

import { get } from "env-var";

import { BcryptAdapter } from "../src/config/bcrypt.adaptar";
import { PostgresDatabase } from "../src/data/postgres/database";
import { ProfileModel, RoleModel } from "../src/data/postgres/models";

const dbConfig = {
	host: get("POSTGRES_HOST").default("localhost").asString(),
	port: get("POSTGRES_PORT").default(5432).asPortNumber(),
	user: get("POSTGRES_USER").required().asString(),
	password: get("POSTGRES_PASSWORD").required().asString(),
	database: get("POSTGRES_DB").required().asString(),
};

const adminUser = {
	first_name: "Admin",
	last_name: "User",
	email: "admin@example.com",
	password: "admin123",
	phone: undefined as string | undefined,
};

async function seedAdmin() {
	const hashAdapter = new BcryptAdapter();

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

		console.log("📦 Seeding admin user...\n");

		const existingAdmin = await ProfileModel.findByEmail(adminUser.email);

		if (existingAdmin) {
			console.log(
				`   ⚠️  Admin user with email "${adminUser.email}" already exists (ID: ${existingAdmin.id})`,
			);
			console.log(
				"   💡 If you want to recreate it, delete it first from the database.\n",
			);
		} else {
			const adminRole = await RoleModel.findByName("admin");
			if (!adminRole) {
				throw new Error(
					'Admin role not found. Please run "npm run db:seed-roles" first.',
				);
			}

			console.log(`   🔐 Hashing password...`);
			const hashedPassword = await hashAdapter.hash(adminUser.password);

			console.log(`   👤 Creating admin user...`);
			const newAdmin = await ProfileModel.create({
				first_name: adminUser.first_name,
				last_name: adminUser.last_name,
				email: adminUser.email,
				password_hash: hashedPassword,
				phone: adminUser.phone,
				role_id: adminRole.id || 0, // Should be valid if role exists
			});

			console.log(`   ✅ Admin user created successfully!`);
			console.log(`      ID: ${newAdmin.id}`);
			console.log(`      Email: ${newAdmin.email}`);
			console.log(`      Name: ${newAdmin.first_name} ${newAdmin.last_name}`);
			console.log(`      Role: Admin`);
			console.log(`      📧 Login credentials:`);
			console.log(`         Email: ${adminUser.email}`);
			console.log(`         Password: ${adminUser.password}`);
			console.log("");
		}

		console.log("✅ Process completed successfully!\n");
	} catch (error: unknown) {
		console.error("\n❌ Error seeding admin user:");
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(errorMessage);
		process.exit(1);
	} finally {
		await PostgresDatabase.disconnect();
	}
}

seedAdmin();
