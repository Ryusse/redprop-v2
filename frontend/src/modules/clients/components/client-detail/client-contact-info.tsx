"use client";

import { Card, CardContent } from "@src/components/ui/card";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";

interface ClientContactInfoProps {
	phone: string;
	email?: string;
	address?: string;
	createdAt: string;
}

export function ClientContactInfo({
	phone,
	email,
	address,
	createdAt,
}: ClientContactInfoProps) {
	return (
		<Card>
			<CardContent className="px-4 py-3">
				<h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-slate-900">
					<User className="h-5 w-5" />
					Información de Contacto
				</h3>
				<div className="space-y-3">
					<div className="flex items-start gap-3">
						<Phone className="mt-0.5 h-5 w-5 text-slate-400" />
						<div>
							<div className="text-slate-500 text-xs">Teléfono</div>
							<div className="text-slate-900 text-sm">{phone}</div>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<Mail className="mt-0.5 h-5 w-5 text-slate-400" />
						<div>
							<div className="text-slate-500 text-xs">Email</div>
							<div className="text-slate-900 text-sm">{email}</div>
						</div>
					</div>
					{address && (
						<div className="flex items-start gap-3">
							<MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
							<div>
								<div className="text-slate-500 text-xs">Dirección</div>
								<div className="text-slate-900 text-sm">{address}</div>
							</div>
						</div>
					)}
					<div className="flex items-start gap-3">
						<Calendar className="mt-0.5 h-5 w-5 text-slate-400" />
						<div>
							<div className="text-slate-500 text-xs">Cliente desde</div>
							<div className="text-slate-900 text-sm">{createdAt}</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
