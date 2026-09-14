import { cn } from "@src/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				[
					// Base
					"animate-pulse rounded-md bg-accent",
				],
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
