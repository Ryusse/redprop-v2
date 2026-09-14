import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	[
		// Base styles
		"inline-flex shrink-0 cursor-pointer! items-center justify-center gap-2 whitespace-nowrap text-wrap rounded-md font-medium text-sm outline-none transition-all",
		// Focus
		"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
		// Disabled
		"disabled:pointer-events-none disabled:opacity-50",
		// Aria Invalid
		"aria-invalid:border-destructive-foreground aria-invalid:bg-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
		// Child/Icon styles
		"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	],
	{
		variants: {
			variant: {
				default: [
					// Base
					"bg-primary text-primary-foreground",
					// Hover
					"hover:bg-primary-hover",
				],
				combobox: [
					// Base
					"border border-input-border bg-transparent",
					// Text & Spacing
					"px-3! text-input-placeholder text-sm!",
				],
				destructive: [
					// Base
					"bg-destructive-foreground text-destructive",
					// Hover
					"hover:bg-destructive-hover",
					// Focus
					"focus-visible:ring-destructive-foreground/20",
				],
				outline: [
					// Base
					"border border-secondary bg-transparent text-secondary shadow-xs",
					// Hover
					"hover:bg-outline-hover hover:text-secondary",
				],
				"outline-gray": [
					// Base
					"border border-border bg-card text-foreground",
				],
				"outline-destructive": [
					// Base
					"border border-destructive-foreground bg-transparent text-destructive-foreground shadow-xs",
					// Hover
					"hover:bg-destructive-foreground hover:text-destructive",
				],
				secondary: [
					// Base
					"bg-secondary text-secondary-foreground",
					// Hover
					"hover:bg-secondary-hover hover:text-secondary-hover",
				],
				ghost: [
					// Hover
					"hover:bg-accent hover:text-accent-foreground",
				],
				"ghost-blue": [
					// Hover
					"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				],
				link: [
					// Base
					"text-primary underline-offset-4",
					// Hover
					"hover:underline",
				],
				white: [
					// Base
					"bg-white fill-foreground text-foreground",
					// Hover
					"hover:bg-white-hover",
				],
				text: [
					// Base
					"border-none bg-transparent text-secondary",
				],
				fab: [
					// Base
					"z-20 bg-fab text-fab-foreground",
				],
			},
			size: {
				default: "h-10 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-12 rounded-md px-6 text-base has-[>svg]:px-6",
				fab: "h-14 w-fit min-w-14 rounded-xl px-6 text-base shadow-fab has-[>svg]:px-6",
				icon: "size-10",
				"icon-sm": "size-8",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
