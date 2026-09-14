import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
	[
		// Base styles
		"inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-sm border px-2 py-1 font-medium text-xs transition-[color,box-shadow]",
		// Focus
		"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
		// Aria Invalid
		"aria-invalid:ring-destructive/20",
		// Child/Icon styles
		"[&>svg]:pointer-events-none [&>svg]:size-3",
	],
	{
		variants: {
			variant: {
				ghost: [
					// Base
					"border-transparent bg-transparent text-foreground",
					// Hover
					"[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				],
				default: [
					// Base
					"border-transparent bg-primary text-primary-foreground",
					// Hover
					"[a&]:hover:bg-primary/90",
				],
				secondary: [
					// Base
					"border-transparent bg-secondary text-secondary-foreground",
					// Hover
					"[a&]:hover:bg-secondary/90",
				],
				success: [
					// Base
					"border border-success-border bg-success text-success-foreground",
					// Hover
					"[a&]:hover:bg-success/90",
				],
				destructive: [
					// Base
					"border border-destructive-border bg-destructive text-destructive-foreground",
					// Focus
					"focus-visible:ring-destructive/20",
					// Hover
					"[a&]:hover:bg-destructive/90",
				],
				white: [
					// Base
					"border border-white bg-white text-foreground shadow-md",
				],
				outline: [
					// Base
					"border border-border text-foreground",
					// Hover
					"[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
				],
				tertiary: [
					// Base
					"border-transparent bg-tertiary text-tertiary-foreground",
					// Hover
					"[a&]:hover:bg-tertiary/90",
				],
			},
			size: {
				default: "h-7",
				sm: "h-6",
				lg: "h-9 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Badge({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
