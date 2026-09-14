"use client";

import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@src/lib/utils";
import { Check, ChevronRight, Circle } from "lucide-react";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Trigger
		ref={ref}
		data-slot="dropdown-menu-trigger"
		className={cn("cursor-pointer!", className)}
		{...props}
	/>
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		data-slot="dropdown-menu-sub-trigger"
		className={cn(
			[
				// Base
				"flex cursor-default select-none items-center gap-2 bg-menu px-2 py-1.5 text-menu-foreground text-sm outline-hidden focus:bg-menu-hover focus:text-menu-hover-foreground data-[state=open]:bg-menu-hover data-[state=open]:text-menu-hover-foreground",
				// Inset
				"data-inset:pl-8",
				// Icon
				"[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-menu-foreground focus:[&_svg:not([class*='text-'])]:text-menu-hover-foreground data-[state=open]:[&_svg:not([class*='text-'])]:text-menu-hover-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
			],
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto" />
	</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
	DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		data-slot="dropdown-menu-sub-content"
		className={cn(
			[
				// Base
				"z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
				// Animations
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
			],
			className,
		)}
		{...props}
	/>
));
DropdownMenuSubContent.displayName =
	DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			data-slot="dropdown-menu-content"
			sideOffset={sideOffset}
			className={cn(
				[
					// Base
					"z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
					// Animations
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
				],
				className,
			)}
			{...props}
		/>
	</DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
		variant?: "default" | "destructive";
	}
>(({ className, inset, variant = "default", ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		data-slot="dropdown-menu-item"
		data-inset={inset}
		data-variant={variant}
		className={cn(
			[
				// Base
				"relative flex h-12 cursor-default select-none items-center gap-2 bg-white px-2 py-1.5 text-menu-foreground text-sm outline-hidden",
				// Focus
				"focus:bg-dropdown-background focus:text-black-foreground",
				// Disabled
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				// Destructive
				"data-[variant=destructive]:*:[svg]:!text-destructive data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20",
				// Icon
				"[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-menu-foreground focus:[&_svg:not([class*='text-'])]:text-menu-hover-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
			],
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		data-slot="dropdown-menu-checkbox-item"
		className={cn(
			[
				// Base
				"relative flex cursor-default select-none items-center gap-2 bg-menu py-1.5 pr-2 pl-8 text-menu-foreground text-sm outline-hidden",
				// Focus
				"focus:bg-menu-hover focus:text-menu-hover-foreground",
				// Disabled
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				// Icon
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			],
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="size-4" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
	DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		data-slot="dropdown-menu-radio-item"
		className={cn(
			[
				// Base
				"relative flex cursor-default select-none items-center gap-2 bg-menu py-1.5 pr-2 pl-8 text-menu-foreground text-sm outline-hidden",
				// Focus
				"focus:bg-menu-hover focus:text-menu-hover-foreground",
				// Disabled
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				// Icon
				"[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
			],
			className,
		)}
		{...props}
	>
		<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="size-2 fill-current" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		data-slot="dropdown-menu-label"
		className={cn(
			"px-2 py-1.5 font-medium text-sm",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		data-slot="dropdown-menu-separator"
		className={cn("-mx-1 my-1 h-px bg-border", className)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cn(
				"ml-auto text-muted-foreground text-xs tracking-widest",
				className,
			)}
			{...props}
		/>
	);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuCheckboxItem,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuGroup,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuRadioGroup,
};
