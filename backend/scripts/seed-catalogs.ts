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
	uniqueField: string,
): Promise<{ created: boolean; id: number }> {
	const client = PostgresDatabase.getClient();
	const checkQuery = `SELECT id FROM ${table} WHERE ${uniqueField} = $1`;
	const checkResult = await client.query(checkQuery, [data[uniqueField]]);

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

async function seedCatalogs() {
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
		console.log("📦 Seeding catalogs...\n");

		let totalCreated = 0;
		let totalExisting = 0;

		console.log("💰 Currency Types:");
		const currencies = [
			{ name: "Peso Argentino", symbol: "ARS" },
			{ name: "Dólar Estadounidense", symbol: "USD" },
			{ name: "Euro", symbol: "EUR" },
		];
		for (const currency of currencies) {
			const result = await insertIfNotExists(
				"currency_types",
				currency,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${currency.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${currency.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n💳 Payment Methods:");
		const paymentMethods = [
			{ name: "Efectivo" },
			{ name: "Transferencia Bancaria" },
			{ name: "Cheque" },
			{ name: "Tarjeta de Crédito" },
			{ name: "Tarjeta de Débito" },
		];
		for (const method of paymentMethods) {
			const result = await insertIfNotExists("payment_methods", method, "name");
			if (result.created) {
				console.log(`   ✅ "${method.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${method.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n📊 Payment Statuses:");
		const paymentStatuses = [
			{ name: "Pendiente" },
			{ name: "Pagado" },
			{ name: "Vencido" },
			{ name: "Cancelado" },
		];
		for (const status of paymentStatuses) {
			const result = await insertIfNotExists(
				"payment_statuses",
				status,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${status.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${status.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n📞 Consultation Types:");
		const consultationTypes = [
			{ name: "Consulta General" },
			{ name: "Consulta de Propiedad" },
			{ name: "Consulta de Alquiler" },
			{ name: "Consulta de Compra" },
		];
		for (const type of consultationTypes) {
			const result = await insertIfNotExists(
				"consultation_types",
				type,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${type.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${type.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n📅 Event Types:");
		const eventTypes = [
			{ name: "Visita a Propiedad" },
			{ name: "Reunión con Cliente" },
			{ name: "Llamada Telefónica" },
			{ name: "Email" },
			{ name: "Firma de Contrato" },
			{ name: "Entrega de Llaves" },
		];
		for (const type of eventTypes) {
			const result = await insertIfNotExists("event_types", type, "name");
			if (result.created) {
				console.log(`   ✅ "${type.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${type.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n👥 Contact Categories:");
		const contactCategories = [
			{ name: "Lead" },
			{ name: "Inquilino" },
			{ name: "Propietario" },
		];
		for (const category of contactCategories) {
			const result = await insertIfNotExists(
				"contact_categories",
				category,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${category.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${category.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n🏠 Property Search Types:");
		const propertySearchTypes = [
			{ name: "Casa" },
			{ name: "PH" },
			{ name: "Departamento" },
			{ name: "Local Comercial" },
			{ name: "Oficina" },
			{ name: "Terreno" },
		];
		for (const type of propertySearchTypes) {
			const result = await insertIfNotExists(
				"property_search_types",
				type,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${type.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${type.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n⏳ Property Ages:");
		const propertyAges = [
			{ name: "A estrenar" },
			{ name: "0-5 años" },
			{ name: "6-10 años" },
			{ name: "11-20 años" },
			{ name: "Más de 20 años" },
		];
		for (const age of propertyAges) {
			const result = await insertIfNotExists("property_ages", age, "name");
			if (result.created) {
				console.log(`   ✅ "${age.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${age.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n🧭 Orientations:");
		const orientations = [
			{ name: "Norte" },
			{ name: "Sur" },
			{ name: "Este" },
			{ name: "Oeste" },
			{ name: "Noreste" },
			{ name: "Noroeste" },
			{ name: "Sureste" },
			{ name: "Suroeste" },
		];
		for (const orientation of orientations) {
			const result = await insertIfNotExists(
				"orientations",
				orientation,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${orientation.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${orientation.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n📐 Dispositions:");
		const dispositions = [
			{ name: "Frente" },
			{ name: "Contrafrente" },
			{ name: "Interno" },
			{ name: "Lateral" },
		];
		for (const disposition of dispositions) {
			const result = await insertIfNotExists(
				"dispositions",
				disposition,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${disposition.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${disposition.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n📋 Property Situations:");
		const propertySituations = [
			{ name: "Regular" },
			{ name: "En proceso de escrituración" },
			{ name: "Escriturado" },
			{ name: "En sucesión" },
		];
		for (const situation of propertySituations) {
			const result = await insertIfNotExists(
				"property_situations",
				situation,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${situation.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${situation.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n🏘️  Property Types:");
		const propertyTypes = [
			{ name: "Casa" },
			{ name: "Departamento" },
			{ name: "PH" },
			{ name: "Local Comercial" },
			{ name: "Oficina" },
			{ name: "Terreno" },
			{ name: "Cochera" },
			{ name: "Depósito" },
		];
		for (const type of propertyTypes) {
			const result = await insertIfNotExists("property_types", type, "name");
			if (result.created) {
				console.log(`   ✅ "${type.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${type.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n💼 Property Operation Types:");
		const operationTypes = [
			{ name: "Venta" },
			{ name: "Alquiler" },
			{ name: "Alquiler Temporal" },
		];
		for (const type of operationTypes) {
			const result = await insertIfNotExists(
				"property_operation_types",
				type,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${type.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(`   ⚠️  "${type.name}" - Already exists (ID: ${result.id})`);
				totalExisting++;
			}
		}

		console.log("\n📊 Property Statuses:");
		const propertyStatuses = [
			{ name: "Disponible" },
			{ name: "En Venta" },
			{ name: "Alquilada" },
			{ name: "Vendida" },
			{ name: "Reservada" },
		];
		for (const status of propertyStatuses) {
			const result = await insertIfNotExists(
				"property_statuses",
				status,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${status.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${status.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n👁️  Visibility Statuses:");
		const visibilityStatuses = [
			{ name: "Publicado" },
			{ name: "Solo Interno" },
			{ name: "Archivada" },
		];
		for (const status of visibilityStatuses) {
			const result = await insertIfNotExists(
				"visibility_statuses",
				status,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${status.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${status.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log("\n🔧 Catalog Services:");
		const services = [
			{ name: "Agua corriente" },
			{ name: "Gas natural" },
			{ name: "Gas envasado" },
			{ name: "Electricidad" },
			{ name: "Cloacas" },
			{ name: "Piscina" },
			{ name: "Quincho" },
			{ name: "Jardín" },
			{ name: "Garage" },
			{ name: "Ascensor" },
			{ name: "Seguridad 24hs" },
			{ name: "Lavadero" },
			{ name: "Terraza" },
			{ name: "Balcón" },
			{ name: "Aire acondicionado" },
			{ name: "Calefacción" },
		];
		for (const service of services) {
			const result = await insertIfNotExists(
				"catalog_services",
				service,
				"name",
			);
			if (result.created) {
				console.log(`   ✅ "${service.name}" - Created (ID: ${result.id})`);
				totalCreated++;
			} else {
				console.log(
					`   ⚠️  "${service.name}" - Already exists (ID: ${result.id})`,
				);
				totalExisting++;
			}
		}

		console.log(`\n📊 Summary:`);
		console.log(`   ✅ Created: ${totalCreated}`);
		console.log(`   ⚠️  Already existed: ${totalExisting}`);
		console.log(`   📋 Total: ${totalCreated + totalExisting}\n`);

		console.log("✅ Process completed successfully!\n");
	} catch (error: unknown) {
		console.error("\n❌ Error seeding catalogs:");
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		console.error(errorMessage);
		process.exit(1);
	} finally {
		await PostgresDatabase.disconnect();
	}
}

seedCatalogs();
