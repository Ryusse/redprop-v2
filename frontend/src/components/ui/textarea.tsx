import type * as React from "react";

import { cn } from "@src/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				[
					// Base
					"field-sizing-content flex min-h-16 w-full rounded-md border border-input-border bg-transparent px-3 py-2 shadow-xs outline-none transition-[color,box-shadow]",
					// Typography
					"text-base md:text-sm",
				],
				[
					// Placeholder
					"placeholder:text-muted-foreground",
					// Focus
					"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
					// Disabled
					"disabled:cursor-not-allowed disabled:opacity-50",
					// Aria Invalid
					"aria-invalid:border-destructive aria-invalid:ring-destructive/20",
				],
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };
