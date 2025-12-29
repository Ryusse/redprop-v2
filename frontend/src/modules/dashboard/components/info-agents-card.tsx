import { Heading } from "@src/components/ui/heading";
import { Text } from "@src/components/ui/text";
import { cn } from "@src/lib/utils";
import type { InfoCardProps } from "@src/modules/dashboard/types";
export function InfoAgentsCard({
	icon: Icon,
	title,
	description,
	className,
}: InfoCardProps) {
	return (
		<article
			className={cn(
				"h-40 w-full space-y-4 rounded-md py-6 pb-[17px] pl-6 shadow-consultations",
				className,
			)}
		>
			<Icon className="h-12 w-12 rounded-md p-3" />
			<div>
				<Heading variant="h3" weight={"medium"} className="text-black">
					{title}
				</Heading>
				<Text className="text-black">{description}</Text>
			</div>
		</article>
	);
}
