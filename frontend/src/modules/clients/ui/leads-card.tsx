"use client";

import { useRouter } from "next/navigation";

import { Button } from "@src/components/ui/button";
import { Card, CardContent } from "@src/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { StatusBadge } from "@src/components/ui/status-badge";
import { paths } from "@src/lib/paths";
import type { Lead, LeadWithProperties } from "@src/types/clients/lead";
import { Mail, MoreHorizontal, Phone } from "lucide-react";

interface LeadsCardProps {
	lead: Lead | LeadWithProperties;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export function LeadsCard({ lead, onEdit, onDelete }: LeadsCardProps) {
	const router = useRouter();

	const leadName = `${lead.first_name} ${lead.last_name}`;

	const handleCardClick = () => {
		router.push(paths.agent.clients.leads.detail(lead.id.toString()));
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit(lead.id);
		}
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(lead.id);
		}
	};

	return (
		<Card
			className="mb-3 cursor-pointer transition-colors hover:bg-slate-50"
			onClick={handleCardClick}
		>
			<CardContent className="w-full p-0">
				<div className="flex items-start justify-between px-4 lg:py-4">
					<div className="flex flex-1 items-center gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
							{lead.first_name.charAt(0)}
						</div>
						<div className="min-w-0 flex-1 text-left">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-slate-900">{leadName}</span>
								<StatusBadge
									status="lead"
									className="hidden text-xs lg:inline-flex"
								>
									Lead
								</StatusBadge>
							</div>
							<div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-sm">
								<div className="flex items-center gap-1">
									<Phone className="hidden h-3.5 w-3.5 lg:inline-flex" />
									<span>{lead.phone}</span>
								</div>
								<span className="text-slate-300">·</span>
								<div className="flex items-center gap-1">
									<Mail className="hidden h-3.5 w-3.5 lg:inline-flex" />
									<span className="truncate">{lead.email}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex shrink-0 items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<MoreHorizontal className="h-4 w-4 text-slate-500" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								onClick={(e) => e.stopPropagation()}
							>
								{onEdit && (
									<DropdownMenuItem onClick={handleEdit}>
										Editar
									</DropdownMenuItem>
								)}
								{onDelete && (
									<DropdownMenuItem
										onClick={handleDelete}
										className="text-red-600"
									>
										Eliminar
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
