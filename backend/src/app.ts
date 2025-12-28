import { envs } from "./config/envs";
import { PostgresDatabase } from "./data/postgres/database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
	await main();
})();

async function main() {
	try {
		await PostgresDatabase.connect({
			dbName: envs.POSTGRES_DB,
			user: envs.POSTGRES_USER,
			password: envs.POSTGRES_PASSWORD,
			host: envs.POSTGRES_HOST,
			port: envs.POSTGRES_PORT,
		});

		const server = new Server({
			port: envs.PORT,
			routes: AppRoutes.routes,
		});

		server.start();

		process.on("SIGINT", async () => {
			console.log("\n🛑 Cerrando aplicación...");
			await server.close();
			process.exit(0);
		});

		process.on("SIGTERM", async () => {
			console.log("\n🛑 Cerrando aplicación...");
			await server.close();
			process.exit(0);
		});
	} catch (error) {
		console.error("❌ Error al iniciar la aplicación:", error);
		process.exit(1);
	}
}
