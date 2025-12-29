import type * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex shrink-0 cursor-pointer! items-center justify-center gap-2 whitespace-nowrap text-wrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive-foreground aria-invalid:bg-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary-hover",
				combobox:
					"border border-input-border bg-transparent px-3! text-input-placeholder text-sm!",
				destructive:
					"bg-destructive-foreground text-destructive hover:bg-destructive-hover focus-visible:ring-destructive-foreground/20",
				outline:
					"border border-secondary bg-transparent text-secondary shadow-xs hover:bg-outline-hover hover:text-secondary",
				"outline-blue":
					"border border-tertiary bg-transparent text-tertiary shadow-xs hover:bg-outline-hover hover:text-tertiary",
				"outline-gray": "border border-border bg-card text-foreground",
				"outline-destructive":
					"border border-destructive-foreground bg-transparent text-destructive-foreground shadow-xs hover:bg-destructive-foreground hover:text-destructive",
				"outline-blue-normal":
					"border border-blue-normal bg-card text-foreground shadow-xs hover:bg-outline-hover hover:text-blue-normal",
				"blue-normal": "border border-blue-normal bg-blue-normal text-white",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:text-secondary-hover",
				tertiary:
					"bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				"ghost-blue":
					"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				white: "bg-white fill-foreground text-foreground hover:bg-white-hover",
				text: "border-none bg-transparent text-secondary",
				fab: "z-20 bg-fab text-fab-foreground",
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
