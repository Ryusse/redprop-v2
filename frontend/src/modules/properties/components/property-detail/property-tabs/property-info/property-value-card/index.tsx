"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@src/components/ui/card";
import { Separator } from "@src/components/ui/separator";
import { cn, formatPrice } from "@src/lib/utils";
import type { Price } from "@src/types/property-detail";

type Props = {
	prices: Price[];
	className?: string;
};

export default function PropertyValueCard({ prices, className }: Props) {
	const salePrice = prices.find((p) => p.operation_type.name === "Venta");
	const rentPrice = prices.find((p) => p.operation_type.name === "Alquiler");

	if (!salePrice && !rentPrice) return null;

	return (
		<Card className={cn("gap-0 py-0", className)}>
			<CardHeader className="gap-0 px-4 py-3">
				<CardTitle className="font-semibold text-base text-secondary">
					Valor de propiedad
				</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent className="space-y-6 px-4 py-6">
				{salePrice && (
					<div className="grid gap-3">
						<span className="font-medium text-secondary">Venta</span>
						<div className="flex items-center justify-center rounded-md bg-muted py-3 font-bold text-secondary text-xl">
							{formatPrice(salePrice.price, salePrice.currency)}
						</div>
					</div>
				)}

				{rentPrice && (
					<div className="space-y-2">
						<span className="font-medium">Alquiler</span>
						<div className="flex items-center justify-center rounded-md py-3 font-bold text-xl">
							{formatPrice(rentPrice.price, rentPrice.currency)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
