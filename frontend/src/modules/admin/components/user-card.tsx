"use client";

import { Heading } from "@src/components/ui/heading";
import { Text } from "@src/components/ui/text";

import type { UserProp } from "../types";
import { Dropdown } from "./dropdown";

export function UserCard({ user }: UserProp) {
	const handleUserUpdated = () => {
		window.location.reload();
	};

	return (
		<div className="mt-4 flex items-center gap-3 rounded-md border border-outline-hover p-4 shadow-user-border sm:gap-4">
			<Heading
				className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-secondary sm:h-12 sm:w-12"
				variant="subtitle2"
				weight="semibold"
				align="center"
			>
				{user.first_name[0]}
			</Heading>
			<div className="flex flex-1 flex-col gap-3 md:gap-2">
				<div className="flex items-center gap-3">
					<Heading
						variant="subtitle3"
						weight="semibold"
						className="max-sm:text-sm max-md:text-base"
					>
						{user.first_name} {user.last_name}
					</Heading>
					<Text
						className="rounded-4xl border border-secondary-light bg-muted px-2 py-1 text-secondary-dark-active sm:px-3 sm:py-2"
						variant="tiny"
					>
						{user.active ? "Activo" : "Inactivo"}
					</Text>
				</div>
				<div className="flex flex-col gap-3 text-grey-dark-active sm:flex-row md:items-center md:gap-4">
					<Text
						variant="small"
						className="max-[400px]:text-[12px] max-[450px]:text-[13px]"
					>
						Tel: {user.phone}
					</Text>
					<Text
						variant="small"
						className="max-[400px]:text-[12px] max-[450px]:text-[13px]"
					>
						· {user.email}
					</Text>
				</div>
			</div>
			<div className="flex items-center">
				<Dropdown id={user.id} user={user} onUserUpdated={handleUserUpdated} />
			</div>
		</div>
	);
}
