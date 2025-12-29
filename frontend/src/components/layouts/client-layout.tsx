"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import SectionHeading from "@src/components/section-heading/index";
import { Input } from "@src/components/ui/input";
import { SearchProvider, useSearch } from "@src/contexts/search-context";
import { paths } from "@src/lib/paths";
import { Search } from "lucide-react";

interface ClientsLayoutProps {
	children: ReactNode;
	activeTab: "leads" | "inquilinos" | "propietarios";
}

function ClientsLayoutContent({ children, activeTab }: ClientsLayoutProps) {
	const { searchTerm, setSearchTerm } = useSearch();

	return (
		<div className="w-full">
			<SectionHeading title="Clientes" />

			{/* Search and Navigation Tabs */}
			<div className="w-full">
				<div className="my-4 flex flex-col items-center gap-4 lg:flex-row lg:gap-1">
					<div className="w-full lg:max-w-2/3">
						<div className="relative">
							<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
							<Input
								type="text"
								placeholder="Buscar por nombre, DNI o dirección..."
								className="h-7 pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex w-full justify-start gap-2 rounded-none bg-transparent px-0 text-black lg:px-5">
						<Link
							href={paths.agent.clients.leads.index()}
							className={`rounded-md px-3 py-1.5 transition-colors ${
								activeTab === "leads"
									? "bg-tertiary text-primary-foreground"
									: "bg-tertiary-light hover:bg-tertiary/30 hover:text-primary-foreground"
							}`}
						>
							Leads
						</Link>
						<Link
							href={paths.agent.clients.inquilinos.index()}
							className={`rounded-md px-3 py-1.5 transition-colors ${
								activeTab === "inquilinos"
									? "bg-tertiary text-primary-foreground"
									: "bg-tertiary-light hover:bg-tertiary/30 hover:text-primary-foreground"
							}`}
						>
							Inquilinos
						</Link>
						<Link
							href={paths.agent.clients.owners.index()}
							className={`rounded-md px-3 py-1.5 transition-colors ${
								activeTab === "propietarios"
									? "bg-tertiary text-primary-foreground"
									: "bg-tertiary-light hover:bg-tertiary/30 hover:text-primary-foreground"
							}`}
						>
							Propietarios
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-0">{children}</div>
		</div>
	);
}

export default function ClientsLayout({
	children,
	activeTab,
}: ClientsLayoutProps) {
	return (
		<SearchProvider>
			<ClientsLayoutContent activeTab={activeTab}>
				{children}
			</ClientsLayoutContent>
		</SearchProvider>
	);
}
