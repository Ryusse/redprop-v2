"use client";

import { memo, useCallback, useMemo, useState } from "react";

import Link from "next/link";

import { Button } from "@src/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@src/components/ui/sheet";
import { useAddPropertyOfInterest } from "@src/hooks/useAddPropertyOfInterest";
import { paths } from "@src/lib/paths";
import type { Consultation } from "@src/types/consultations";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Check, HousePlus, Loader2 } from "lucide-react";

import { ConsultationActions } from "./consultation-actions";
import { ConsultationContactInfo } from "./consultation-contact-info";

const MemoConsultationContactInfo = memo(ConsultationContactInfo);
const MemoConsultationActions = memo(ConsultationActions);

interface ConsultationDetailSheetProps {
	consultation: Consultation | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddContact?: (consultation: Consultation) => void;
	contactId?: number;
}

export function ConsultationDetailSheet({
	consultation,
	open,
	onOpenChange,
	onAddContact,
	contactId,
}: ConsultationDetailSheetProps) {
	const property = consultation?.property;
	const hasProperty = !!property;
	const propertyUrl = useMemo(
		() =>
			property?.id ? paths.public.property(String(property.id)) : undefined,
		[property?.id],
	);

	const { handleAddProperty, isPropertyAdded, isLoading } =
		useAddPropertyOfInterest({ clientId: contactId });
	const [isAddingProperty, setIsAddingProperty] = useState(false);

	const propertyAlreadyAdded = property?.id
		? isPropertyAdded(property.id)
		: false;

	const handleAddPropertyClick = useCallback(async () => {
		if (!contactId || !property?.id) return;
		setIsAddingProperty(true);
		await handleAddProperty(contactId, property.id);
		setIsAddingProperty(false);
	}, [contactId, property?.id, handleAddProperty]);

	const handleAddContact = useCallback(() => {
		if (onAddContact && consultation) onAddContact(consultation);
	}, [onAddContact, consultation]);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="flex w-full flex-col rounded-none border-none p-0 sm:max-w-md"
			>
				{consultation ? (
					<>
						<SheetHeader className="border-b px-6 py-4">
							<SheetTitle className="font-semibold text-lg">
								Detalle de Consulta
							</SheetTitle>
						</SheetHeader>

						<div className="flex-1 space-y-6 overflow-y-auto px-6 py-4">
							<MemoConsultationContactInfo consultation={consultation} />

							{consultation.consultation_type?.name && (
								<div>
									<h3 className="mb-2 font-semibold text-sm">
										Tipo de consulta
									</h3>
									<div className="rounded-lg bg-slate-50 p-3">
										<p className="font-medium text-slate-700 text-sm">
											{consultation.consultation_type.name}
										</p>
									</div>
								</div>
							)}

							{hasProperty && (
								<div>
									<div className="mb-2 flex items-center justify-between">
										<h3 className="font-semibold text-sm">
											Propiedad consultada
										</h3>
										{contactId &&
											(isLoading ? (
												<span className="flex h-8 items-center justify-center px-4">
													<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
												</span>
											) : (
												<Button
													variant="link"
													size="sm"
													disabled={propertyAlreadyAdded || isAddingProperty}
													onClick={handleAddPropertyClick}
													className="h-8"
												>
													{propertyAlreadyAdded ? (
														<span className="flex items-center gap-1 text-green-700">
															<Check className="h-4 w-4" />
															Agregada
														</span>
													) : (
														<span className="flex items-center gap-1">
															<HousePlus className="h-4 w-4" />
															Agregar a intereses
														</span>
													)}
												</Button>
											))}
									</div>
									<div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
										<div className="flex items-center gap-2">
											<p className="font-medium text-slate-700 text-sm">
												{property?.title}
											</p>
										</div>
										<div className="ml-4 flex items-center gap-2">
											{propertyUrl && (
												<Button variant="link" asChild size="sm">
													<Link
														href={propertyUrl}
														target="_blank"
														rel="noopener noreferrer"
													>
														Ver propiedad
													</Link>
												</Button>
											)}
										</div>
									</div>
								</div>
							)}

							<div>
								<h3 className="mb-2 font-semibold text-sm">Mensaje</h3>
								<div className="rounded-lg bg-slate-50 p-4">
									<p className="text-slate-700 text-sm leading-relaxed">
										{consultation.message}
									</p>
								</div>
							</div>

							{consultation.response && (
								<div>
									<h3 className="mb-2 font-semibold text-sm">Tu Respuesta</h3>
									<div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
										<p className="text-slate-700 text-sm leading-relaxed">
											{consultation.response}
										</p>
										{consultation.response_date && (
											<p className="mt-2 text-slate-500 text-xs">
												Enviado el{" "}
												{format(
													new Date(consultation.response_date),
													"d MMM  h:mm a",
													{ locale: es },
												)}
											</p>
										)}
									</div>
								</div>
							)}
						</div>

						<MemoConsultationActions
							consultation={consultation}
							onAddContact={handleAddContact}
							onOpenChange={onOpenChange}
						/>
					</>
				) : (
					<div className="flex-1 overflow-y-auto px-6 py-6 text-slate-600 text-sm">
						Selecciona una consulta para ver el detalle.
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
