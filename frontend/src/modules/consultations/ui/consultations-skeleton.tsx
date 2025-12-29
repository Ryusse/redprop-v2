import { Card, CardContent } from "@src/components/ui/card";
import { Skeleton } from "@src/components/ui/skeleton";

export default function ConsultationsSkeleton() {
	return (
		<div className="space-y-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={i} className="mb-3">
					<CardContent className="w-full p-0">
						<div className="flex items-center justify-between px-4 py-3">
							<div className="flex flex-1 items-center gap-4">
								<div className="min-w-0 flex-1 space-y-3 text-left">
									{/* Nombre */}
									<Skeleton className="h-5 w-[180px]" />

									{/* Propiedad */}
									<Skeleton className="h-4 w-[250px]" />

									{/* Tipo de consulta */}
									<Skeleton className="h-3 w-[120px]" />

									{/* Contacto */}
									<div className="flex items-center gap-3">
										<Skeleton className="h-4 w-[130px]" />
										<Skeleton className="h-4 w-4 rounded-full" />
										<Skeleton className="h-4 w-[180px]" />
									</div>

									{/* Fecha */}
									<Skeleton className="h-3 w-[100px]" />
								</div>
							</div>

							{/* Indicador y menú */}
							<div className="flex shrink-0 items-center gap-2">
								<Skeleton className="h-2 w-2 rounded-full" />
								<Skeleton className="h-8 w-8 rounded-md" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
