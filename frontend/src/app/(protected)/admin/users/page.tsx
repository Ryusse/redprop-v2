import { api } from "@src/lib/axios";
import { UserHeader, UserList } from "@src/modules/admin/components";
import type { ListUserProps } from "@src/modules/admin/types";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
	try {
		const { users } = await api.get<ListUserProps>("/users");

		return (
			<section className="grid max-h-fit min-h-dvh grid-rows-[auto_1fr]">
				<header className="flex justify-between border-border border-b pb-4 sm:pb-8">
					<UserHeader />
				</header>
				<main>
					<UserList users={users} />
				</main>
			</section>
		);
	} catch (error) {
		console.error("Error al cargar agentes:", error);

		const errorMessage =
			error instanceof Error
				? error.message
				: "Ocurrió un error al cargar los agentes";

		return (
			<section className="grid max-h-fit min-h-dvh grid-rows-[auto_1fr_auto]">
				<header className="flex justify-between border-border border-b pb-4 sm:pb-8">
					<UserHeader />
				</header>
				<main className="flex h-full flex-col items-center justify-center">
					<div className="p-4 text-center sm:p-8">
						<p className="mb-4 font-medium text-lg text-red-500">
							❌ {errorMessage}
						</p>
						<p className="text-gray-600">
							Por favor, intenta nuevamente más tarde.
						</p>
					</div>
				</main>
			</section>
		);
	}
}
