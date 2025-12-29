"use client";

import { Button } from "@src/components/ui/button";
import { Card, CardContent } from "@src/components/ui/card";
import { Checkbox } from "@src/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import type { Consultation } from "@src/types/consultations";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, MailIcon, MoreHorizontal, PhoneIcon } from "lucide-react";

import { ConsultationDeleteAction } from "../components/consultation-delete-action";

interface ConsultationCardProps {
	consultation: Consultation;
	onMarkAsRead?: (id: number) => void;
	onMarkAsUnread?: (id: number) => void;
	onDelete?: (id: number) => void;
	onClick?: () => void;
	isSelectionMode?: boolean;
	isSelected?: boolean;
	onToggleSelection?: (id: number) => void;
}

export function ConsultationCard({
	consultation,
	onMarkAsRead,
	onMarkAsUnread,
	onDelete,
	onClick,
	isSelectionMode = false,
	isSelected = false,
	onToggleSelection,
}: ConsultationCardProps) {
	const formattedDate = format(
		new Date(consultation.consultation_date),
		"d MMM · h:mm a",
		{ locale: es },
	);

	const contact = consultation.client || consultation.consultant;
	const contactName = contact
		? `${contact.first_name} ${contact.last_name}`
		: "Contacto desconocido";
	const contactPhone = contact?.phone || "No disponible";
	const contactEmail = contact?.email || "No disponible";

	const handleMarkAsRead = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onMarkAsRead) {
			onMarkAsRead(consultation.id);
		}
	};

	const handleMarkAsUnread = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onMarkAsUnread) {
			onMarkAsUnread(consultation.id);
		}
	};

	return (
		<Card
			className={`mb-3 cursor-pointer transition-colors hover:bg-slate-50 ${
				isSelected ? "bg-blue-50 ring-2 ring-blue-500" : ""
			}`}
			onClick={onClick}
		>
			<CardContent className="w-full p-0">
				<div className="flex items-start justify-between px-4 py-1">
					<div className="flex flex-1 items-center gap-4">
						{isSelectionMode && (
							<Checkbox
								checked={isSelected}
								onCheckedChange={() => onToggleSelection?.(consultation.id)}
								onClick={(e) => e.stopPropagation()}
								className="mt-1"
							/>
						)}

						<div className="min-w-0 flex-1 text-left">
							<div className="mb-1 flex items-center gap-2">
								<span className="font-semibold text-lg text-slate-900">
									{contactName}
								</span>
							</div>
							<div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 text-sm">
								<div className="flex items-center gap-1">
									{consultation.consultation_type && (
										<div className="font-medium">
											{consultation.consultation_type.name}
										</div>
									)}
								</div>
								<span className="text-slate-300">·</span>
								<div className="flex items-center gap-1">
									{consultation.property && (
										<div>{consultation.property.title}</div>
									)}
								</div>
							</div>
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 text-sm">
								<div className="flex items-center gap-1">
									<MailIcon className="h-3.5 w-3.5" />
									<span className="truncate">{contactEmail}</span>
								</div>
								<span className="text-slate-300">·</span>
								<div className="flex items-center gap-1">
									<PhoneIcon className="h-3.5 w-3.5" />
									<span>{contactPhone}</span>
								</div>
							</div>
							<div className="mt-2 flex items-center gap-1 text-slate-400 text-xs">
								<Clock className="h-3 w-3" />
								<span>{formattedDate}</span>
							</div>
						</div>
					</div>

					<div className="flex shrink-0 items-center gap-2">
						{!consultation.is_read && (
							<div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary-light/30">
								<span className="h-2 w-2 rounded-full bg-blue-600"></span>
							</div>
						)}

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
								{!consultation.is_read && onMarkAsRead && (
									<DropdownMenuItem onClick={handleMarkAsRead}>
										Marcar como leído
									</DropdownMenuItem>
								)}
								{consultation.is_read && onMarkAsUnread && (
									<DropdownMenuItem onClick={handleMarkAsUnread}>
										Marcar como no leído
									</DropdownMenuItem>
								)}
								{onDelete && (
									<ConsultationDeleteAction
										consultationId={consultation.id}
										onDelete={onDelete}
									/>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
