"use client";

import type * as React from "react";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
	[
		// Base
		"peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all",
		// Focus
		"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
		// Disabled
		"disabled:cursor-not-allowed disabled:opacity-50",
		// State
		"data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
	],
	{
		variants: {
			size: {
				default: [
					// Base
					"h-7 w-12",
				],
				sm: [
					// Base
					"h-[14px] w-7",
				],
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

const switchThumbVariants = cva(
	[
		// Base
		"pointer-events-none block rounded-full bg-card shadow-lg ring-0 transition-transform",
	],
	{
		variants: {
			size: {
				default: [
					// Base
					"size-5",
					// State
					"data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
				],
				sm: [
					// Base
					"size-3",
					// State
					"data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5",
				],
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

function Switch({
	className,
	size,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
	VariantProps<typeof switchVariants>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(switchVariants({ size, className }))}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(switchThumbVariants({ size }))}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
