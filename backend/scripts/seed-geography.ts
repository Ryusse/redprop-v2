import "dotenv/config";

import { get } from "env-var";

import { PostgresDatabase } from "../src/data/postgres/database";

const dbConfig = {
	host: get("POSTGRES_HOST").default("localhost").asString(),
	port: get("POSTGRES_PORT").default(5432).asPortNumber(),
	user: get("POSTGRES_USER").required().asString(),
	password: get("POSTGRES_PASSWORD").required().asString(),
	database: get("POSTGRES_DB").required().asString(),
};

async function insertIfNotExists(
	table: string,
	data: Record<string, unknown>,
	uniqueField: string | string[],
): Promise<{ created: boolean; id: number }> {
	const client = PostgresDatabase.getClient();

	let checkQuery: string;
	let checkValues: unknown[];

	if (Array.isArray(uniqueField)) {
		const conditions = uniqueField
			.map((field, index) => `${field} = $${index + 1}`)
			.join(" AND ");
		checkQuery = `SELECT id FROM ${table} WHERE ${conditions}`;
		checkValues = uniqueField.map((field) => data[field]);
	} else {
		checkQuery = `SELECT id FROM ${table} WHERE ${uniqueField} = $1`;
		checkValues = [data[uniqueField]];
	}

	const checkResult = await client.query(checkQuery, checkValues);

	if (checkResult.rows.length > 0) {
		return { created: false, id: checkResult.rows[0].id };
	}

	const fields = Object.keys(data);
	const values = Object.values(data);
	const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
	const insertQuery = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders}) RETURNING id`;
	const insertResult = await client.query(insertQuery, values);
	return { created: true, id: insertResult.rows[0].id };
}

async function seedGeography() {
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
		console.log("📦 Seeding geography data (Argentina)...\n");

		let totalCreated = 0;
		let totalExisting = 0;

		console.log("🌍 Countries:");
		const argentina = await insertIfNotExists(
			"countries",
			{ name: "Argentina" },
			"name",
		);
		if (argentina.created) {
			console.log(`   ✅ "Argentina" - Created (ID: ${argentina.id})`);
			totalCreated++;
		} else {
			console.log(`   ⚠️  "Argentina" - Already exists (ID: ${argentina.id})`);
			totalExisting++;
		}

		console.log("\n🗺️  Provinces:");
		const provinces = [
			{ name: "Buenos Aires", country_id: argentina.id },
			{ name: "Córdoba", country_id: argentina.id },
			{ name: "Santa Fe", country_id: argentina.id },
			{ name: "Mendoza", country_id: argentina.id },
			{ name: "Tucumán", country_id: argentina.id },
			{ name: "Salta", country_id: argentina.id },
			{ name: "Entre Ríos", country_id: argentina.id },
			{ name: "Misiones", country_id: argentina.id },
			{ name: "Corrientes", country_id: argentina.id },
			{ name: "Chaco", country_id: argentina.id },
			{ name: "Santiago del Estero", country_id: argentina.id },
			{ name: "San Juan", country_id: argentina.id },
			{ name: "Jujuy", country_id: argentina.id },
			{ name: "Río Negro", country_id: argentina.id },
			{ name: "Formosa", country_id: argentina.id },
			{ name: "Neuquén", country_id: argentina.id },
			{ name: "Catamarca", country_id: argentina.id },
			{ name: "La Rioja", country_id: argentina.id },
			{ name: "Chubut", country_id: argentina.id },
			{ name: "San Luis", country_id: argentina.id },
			{ name: "La Pampa", country_id: argentina.id },
			{ name: "Santa Cruz", country_id: argentina.id },
			{ name: "Tierra del Fuego", country_id: argentina.id },
		];

		const provinceMap: { [key: string]: number } = {};

		for (const province of provinces) {
			const result = await insertIfNotExists("provinces", province, "name");
			provinceMap[province.name] = result.id;
			if (result.created) {
				console.log(`   ✅ "${province.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${province.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n🏙️  Cities (Buenos Aires Province):");
		const buenosAiresCities = [
			"Ciudad Autónoma de Buenos Aires",
			"La Plata",
			"Mar del Plata",
			"Bahía Blanca",
			"San Nicolás",
			"Zárate",
			"Campana",
			"Pilar",
			"Tigre",
			"San Isidro",
			"Vicente López",
			"Quilmes",
			"Avellaneda",
			"Lanús",
			"Lomas de Zamora",
			"Banfield",
			"Adrogué",
			"Burzaco",
			"Temperley",
			"Morón",
			"Ituzaingó",
			"Merlo",
			"Moreno",
			"San Miguel",
			"Malvinas Argentinas",
		];

		for (const cityName of buenosAiresCities) {
			const result = await insertIfNotExists(
				"cities",
				{ name: cityName, province_id: provinceMap["Buenos Aires"] },
				["name", "province_id"],
			);
			if (result.created) {
				console.log(`   ✅ "${cityName}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${cityName}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n🏙️  Cities (Córdoba Province):");
		const cordobaCities = [
			"Córdoba",
			"Villa Carlos Paz",
			"Río Cuarto",
			"Villa María",
			"San Francisco",
		];

		for (const cityName of cordobaCities) {
			const result = await insertIfNotExists(
				"cities",
				{ name: cityName, province_id: provinceMap.Córdoba },
				["name", "province_id"],
			);
			if (result.created) {
				console.log(`   ✅ "${cityName}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${cityName}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n🏙️  Cities (Santa Fe Province):");
		const santaFeCities = ["Rosario", "Santa Fe", "Rafaela", "Venado Tuerto"];

		for (const cityName of santaFeCities) {
			const result = await insertIfNotExists(
				"cities",
				{ name: cityName, province_id: provinceMap["Santa Fe"] },
				["name", "province_id"],
			);
			if (result.created) {
				console.log(`   ✅ "${cityName}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${cityName}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n🏙️  Cities (Mendoza Province):");
		const mendozaCities = ["Mendoza", "San Rafael", "Godoy Cruz"];

		for (const cityName of mendozaCities) {
			const result = await insertIfNotExists(
				"cities",
				{ name: cityName, province_id: provinceMap.Mendoza },
				["name", "province_id"],
			);
			if (result.created) {
				console.log(`   ✅ "${cityName}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${cityName}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log(`\n📊 Summary:`);
		console.log(`   ✅ Created: ${totalCreated}`);
		console.log(`   ⚠️  Already existed: ${totalExisting}`);
		console.log(`   📋 Total: ${totalCreated + totalExisting}\n`);

		console.log("✅ Process completed successfully!\n");
	} catch (error: unknown) {
		console.error("\n❌ Error seeding geography:");
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(errorMessage);
		process.exit(1);
	} finally {
		await PostgresDatabase.disconnect();
	}
}

seedGeography();
