"use client";

import type * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@src/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const tabsVariants = cva("flex flex-col gap-2", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

function Tabs({
	className,
	variant,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root> &
	VariantProps<typeof tabsVariants>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn(tabsVariants({ variant, className }))}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	[
		// Base
		"inline-flex items-center justify-center rounded-md",
	],
	{
		variants: {
			variant: {
				default: "bg-muted text-muted-foreground",
				blue: "bg-transparent px-0",
				underline: "gap-6 bg-transparent p-0",
			},
			size: {
				default: "h-10 w-fit p-1",
				lg: "h-full w-fit p-2",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function TabsList({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
	VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(tabsListVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

const tabsTriggerVariants = cva(
	[
		// Base
		"inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium text-sm transition-[color,box-shadow]",
		// Focus
		"focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
		// Disabled
		"disabled:pointer-events-none disabled:opacity-50",
		// Children
		"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
	],
	{
		variants: {
			variant: {
				default: [
					// Base
					"border border-transparent text-foreground",
					// Active
					"data-[state=active]:bg-card data-[state=active]:shadow-sm",
				],
				blue: [
					// Base
					"rounded-none border border-transparent border-b-2 border-b-transparent bg-tertiary text-tertiary-foreground",
					// Siblings
					"first:rounded-tl-lg last:rounded-tr-lg",
					// Active
					"data-[state=active]:border-b-card",
				],
				underline: [
					// Base
					"rounded-none border-transparent border-b-2 bg-transparent text-muted-foreground shadow-none",
					// Hover
					"hover:text-foreground",
					// Active
					"data-[state=active]:border-primary data-[state=active]:text-foreground",
				],
			},
			size: {
				default: "h-full flex-1 px-2 py-1",
				lg: "h-12 flex-1 px-2 py-1",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function TabsTrigger({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> &
	VariantProps<typeof tabsTriggerVariants>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(tabsTriggerVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

const tabsContentVariants = cva(
	[
		// Base
		"flex-1 outline-none",
	],
	{
		variants: {
			variant: {
				default: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function TabsContent({
	className,
	variant,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content> &
	VariantProps<typeof tabsContentVariants>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn(tabsContentVariants({ variant, className }))}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	tabsVariants,
	tabsListVariants,
	tabsTriggerVariants,
	tabsContentVariants,
};
