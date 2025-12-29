import Link from "next/link";

import { Text } from "@src/components/ui/text";
import { paths } from "@src/lib/paths";
import { Plus } from "lucide-react";

export function AdminCreateAgentLink() {
	return (
		<Link
			href={paths.admin.users.create()}
			className="flex min-w-max! cursor-pointer items-center gap-2 rounded-lg bg-sidebar-accent-foreground px-6 py-3 text-white transition-colors duration-300 hover:bg-outline-foreground"
		>
			<Plus className="inline stroke-white text-white" size={14} />
			<Text weight="normal" variant="body" className="inline">
				Crear usuario
			</Text>
		</Link>
	);
}
