"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@src/components/ui/button";
import { Card, CardContent } from "@src/components/ui/card";
import { ImagePlaceholder } from "@src/components/ui/image-placeholder";
import { paths } from "@src/lib/paths";

export interface ClientProperty {
	id: string | number;
	address: string;
	city: string;
	type: string;
	rooms: number;
	bathrooms: number;
	surface: number;
	image: string;
	status: string;
	age?: string;
	prices?: {
		rent: number;
		maintenance: number;
	};
}

interface ClientPropertyCardProps {
	property: ClientProperty;
}

export function ClientPropertyCard({ property }: ClientPropertyCardProps) {
	return (
		<Card
			key={property.id}
			className="overflow-visible transition-shadow hover:shadow-md"
		>
			<CardContent className="overflow-visible px-4 py-1">
				<div className="flex gap-4 overflow-visible">
					<div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-200">
						{property.image ? (
							<Image
								src={property.image}
								alt={property.address}
								fill
								className="object-cover"
							/>
						) : (
							<ImagePlaceholder className="h-full w-full bg-slate-100" />
						)}
					</div>

					<div className="flex-1">
						<div className="mb-2 flex items-start justify-between lg:mb-6">
							<div>
								<h4 className="mb-1 font-semibold text-slate-900">
									{property.address}
								</h4>
								<div className="text-slate-500 text-xs lg:text-sm">
									{property.city} · {property.type}
								</div>
							</div>
							<div className="hidden flex-col items-center lg:flex">
								<div className="text-slate-500 text-xs">Antigüedad</div>
								<div className="font-bold text-lg text-slate-900">
									{property.age}
								</div>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="mb-3 hidden grid-cols-3 gap-4 lg:grid">
								<div>
									<div className="text-slate-500 text-xs">Ambientes</div>
									<div className="font-medium text-slate-900 text-sm">
										{property.rooms}
									</div>
								</div>
								<div>
									<div className="text-slate-500 text-xs">Baños</div>
									<div className="font-medium text-slate-900 text-sm">
										{property.bathrooms}
									</div>
								</div>
								<div>
									<div className="text-slate-500 text-xs">Superficie</div>
									<div className="font-medium text-slate-900 text-sm">
										{property.surface} m²
									</div>
								</div>
							</div>

							<Button variant="outline" size="sm" asChild>
								<Link href={paths.agent.properties.detail(String(property.id))}>
									Ver Detalles
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
