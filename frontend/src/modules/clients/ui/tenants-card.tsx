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
import { parseAmount } from "@src/lib/parsing";
import { paths } from "@src/lib/paths";
import type {
	Tenant,
	TenantWithRentedProperty,
} from "@src/types/clients/tenant";
import { MoreHorizontal } from "lucide-react";

interface TenantsCardProps {
	tenant: Tenant | TenantWithRentedProperty;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

export function TenantsCard({ tenant, onEdit, onDelete }: TenantsCardProps) {
	const router = useRouter();

	const tenantName = `${tenant.first_name} ${tenant.last_name}`;
	const propertyTitle =
		(tenant as TenantWithRentedProperty).rented_property?.address
			?.full_address || "Sin propiedad asignada";
	const monthlyAmountRaw = (tenant as TenantWithRentedProperty).rented_property
		?.rental?.monthly_amount;
	const monthlyAmount = parseAmount(monthlyAmountRaw);

	const handleCardClick = () => {
		router.push(paths.agent.clients.inquilinos.detail(tenant.id));
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onEdit) {
			onEdit(tenant.id);
		}
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onDelete) {
			onDelete(tenant.id);
		}
	};

	return (
		<Card
			className="mb-3 cursor-pointer transition-colors hover:bg-slate-50"
			onClick={handleCardClick}
		>
			<CardContent className="w-full p-0">
				<div className="flex items-start justify-between px-4 lg:py-4">
					<div className="flex items-center gap-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
							{tenant.first_name.charAt(0)}
						</div>
						<div className="text-left">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-slate-900">
									{tenantName}
								</span>
								<StatusBadge
									status="inquilino"
									className="hidden text-xs lg:inline-flex"
								>
									Inquilino
								</StatusBadge>
							</div>
							<div className="mt-1 text-slate-500 text-sm">
								<div>
									<span className="hidden lg:inline-flex">Tel: </span>
									{tenant.phone} ·
								</div>
								<div>{propertyTitle}</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end lg:flex-row lg:items-center lg:gap-4">
						<div className="order-2 mr-2 text-right lg:-order-1">
							<div className="text-slate-500 text-xs">Alquiler</div>
							<div className="font-semibold text-slate-900 lg:text-2xl">
								{monthlyAmount
									? `$${monthlyAmount.toLocaleString("es-AR")}`
									: "N/A"}
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
								<Button
									variant="ghost"
									size="icon"
									className="-mt-1 h-8 w-8 lg:-mt-5"
								>
									<MoreHorizontal className="h-4 w-4 text-slate-500" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								onClick={(e) => e.stopPropagation()}
							>
								{onEdit && (
									<DropdownMenuItem onClick={handleEdit}>
										Editar cliente
									</DropdownMenuItem>
								)}
								{onDelete && (
									<DropdownMenuItem
										onClick={handleDelete}
										className="text-red-600"
									>
										Eliminar cliente
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
