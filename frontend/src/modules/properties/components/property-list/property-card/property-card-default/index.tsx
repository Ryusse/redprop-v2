import Image from "next/image";
import Link from "next/link";

import { Badge } from "@src/components/ui/badge";
import { Card, CardContent } from "@src/components/ui/card";
import { Separator } from "@src/components/ui/separator";
import { paths } from "@src/lib/paths";
import { cn } from "@src/lib/utils";
import { OperationTypeLabel, type Property } from "@src/types/property";
import { Bath, Bed, MapPin, Square } from "lucide-react";

type Props = {
	property: Property;
	href?: string;
};

export default function PropertyCardDefault({ property, href }: Props) {
	const isAvailable = property.featured_web;
	const price = property.main_price;
	const operationTypeId = property?.main_price?.operation_type?.id || 0;

	return (
		<Card className="group relative flex gap-0 py-0 transition-[color,box-shadow] hover:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
			<figure className="relative aspect-video h-[136px] w-full rounded-t-lg">
				<Image
					width={300}
					height={136}
					src={
						property.primary_image?.file_path ||
						"https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
					}
					alt={property.title}
					className="h-full w-full rounded-t-lg object-cover"
				/>
				<div className="absolute top-3 left-3 flex gap-2">
					<Badge variant="secondary" className="bg-card text-secondary">
						{property.property_type.name}
					</Badge>
					<Badge
						variant="default"
						className="bg-primary text-primary-foreground"
					>
						{OperationTypeLabel[operationTypeId] || "Venta"}
					</Badge>
				</div>
			</figure>
			<CardContent className="flex flex-col gap-0 p-0 py-4">
				<div className="flex flex-col gap-4 p-4">
					<div className="h-[48px]">
						<h2 className={cn("line-clamp-2 font-semibold text-base")}>
							<Link
								href={
									href ||
									paths.agent.properties.detail(
										property.slug || property.id.toString(),
									)
								}
								className="outline-none after:absolute after:inset-0 after:content-['']"
							>
								{property.title}
							</Link>
						</h2>
					</div>
					<div className="flex items-center gap-1">
						<MapPin className="size-4" />
						<p className="text-base text-muted-foreground">
							{property.main_address.city.name}
						</p>
					</div>
					<div className="flex items-center gap-4">
						<Badge variant="ghost" className="gap-2 px-0 py-0 text-base">
							<Bed className="size-4!" />
							{property.rooms_count}
						</Badge>
						<Badge variant="ghost" className="gap-2 px-0 py-0 text-base">
							<Bath className="size-4!" />
							{property.bathrooms_count}
						</Badge>
						<Badge variant="ghost" className="gap-2 px-0 py-0 text-base">
							<Square className="size-4!" /> {property.total_area || 0}m²
						</Badge>
					</div>
				</div>
				<Separator />
				<div className="flex flex-col items-center justify-between gap-3 p-4 xl:flex-row">
					<p className="font-semibold text-foreground text-sm lg:text-base">
						{price?.currency?.symbol || "USD"}{" "}
						{Number(price?.price || 0).toLocaleString()}
					</p>
					<Badge
						variant={isAvailable ? "success" : "outline"}
						className={cn(
							"h-7 gap-2.5 border-transparent bg-transparent text-sm",
							!isAvailable && "text-amber-600",
						)}
					>
						<div
							className={cn(
								"h-2 w-2 rounded-full",
								isAvailable ? "bg-success-foreground" : "bg-amber-600",
							)}
						></div>
						{isAvailable ? "Publicado" : "No publicado"}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}
