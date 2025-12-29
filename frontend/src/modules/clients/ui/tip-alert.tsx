import { Card, CardContent } from "@src/components/ui/card";
import { Info } from "lucide-react";

export default function TipAlert() {
	return (
		<Card className="mt-4 hidden h-fit w-[275px] rounded-xl border-none p-4 shadow-md/20 lg:block">
			<div className="flex items-start gap-3">
				<div className="flex items-center justify-center rounded-md bg-secondary-light/50 p-2 text-secondary">
					<Info className="h-5 w-5" />
				</div>

				<CardContent className="p-0">
					<h3 className="font-medium text-base">Consejo</h3>
					<p className="text-muted-foreground text-sm leading-snug">
						Completa todos los campos para tener una publicación más efectiva
					</p>
				</CardContent>
			</div>
		</Card>
	);
}
