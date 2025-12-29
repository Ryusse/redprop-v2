"use client";

import type { ReactNode } from "react";

import SectionHeading from "@src/components/section-heading/index";

interface ClientsLayoutProps {
	children: ReactNode;
}

export default function CreateClientLayout({ children }: ClientsLayoutProps) {
	return (
		<div className="mx-auto w-full">
			<SectionHeading title="Editar cliente" />

			<div className="mt-0">{children}</div>
		</div>
	);
}
