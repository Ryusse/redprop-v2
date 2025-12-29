"use client";

import { useState } from "react";

import { Button } from "@src/components/ui/button";
import { Separator } from "@src/components/ui/separator";
import { getDocumentDownloadUrl } from "@src/modules/properties/services/property-service";
import type { PropertyDetail } from "@src/types/property-detail";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Download, FileText } from "lucide-react";
import { toast } from "sonner";

type Props = {
	property: PropertyDetail;
};

export default function PropertyDocuments({ property }: Props) {
	const { documents } = property;
	const [searchQuery] = useState("");

	const filteredDocuments = documents?.filter((doc) =>
		(doc.document_name || "").toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const formatDate = (dateString: string) => {
		if (!dateString) return "Fecha desconocida";
		try {
			return format(new Date(dateString), "d MMM yyyy", { locale: es });
		} catch (_e) {
			return dateString;
		}
	};

	return (
		<div className="space-y-6">
			{!documents || documents.length === 0 ? (
				<div className="flex flex-col items-center justify-center rounded-lg border border-border border-dashed bg-card py-16 text-center">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
						<FileText className="h-8 w-8" />
					</div>
					<h3 className="mb-1 font-medium text-foreground text-lg">
						Sin documentos
					</h3>
					<p className="max-w-sm text-muted-foreground text-sm">
						Esta propiedad aún no tiene documentos adjuntos.
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredDocuments?.map((doc, index) => {
						return (
							<div
								key={index}
								className="flex flex-col justify-between rounded-lg border border-border bg-card shadow-sm"
							>
								<div className="flex gap-4 p-6">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-tertiary">
										<FileText className="h-5 w-5" />
									</div>
									<div className="grid gap-3 overflow-hidden">
										<h4
											className="truncate font-semibold text-foreground text-sm"
											title={doc.document_name}
										>
											{doc.document_name || `Documento ${index + 1}`}
										</h4>
										<p className="line-clamp-2 text-muted-foreground text-xs">
											Documento adjunto el {formatDate(doc.uploaded_at)}
										</p>
									</div>
								</div>
								<Separator />
								<div className="space-y-2 p-6">
									<div className="flex items-center gap-2 text-muted-foreground text-xs">
										<Calendar className="h-3 w-3" />
										<span>{formatDate(doc.uploaded_at)}</span>
									</div>
								</div>
								<Separator />
								<div className="flex w-full gap-2 p-6">
									<Button
										variant="tertiary"
										size="sm"
										className="w-full"
										onClick={async () => {
											if (doc.id) {
												try {
													const result = await getDocumentDownloadUrl(doc.id);
													if (result.success && result.url) {
														window.open(result.url, "_blank");
													} else {
														toast.error("No se pudo descargar el documento");
													}
												} catch (error) {
													console.error(error);
													toast.error("Error al descargar el documento");
												}
											}
										}}
									>
										<Download className="mr-2 h-3 w-3" />
										Descargar
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
