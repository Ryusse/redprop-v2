"use client";

import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@src/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
	const _values = React.useMemo(
		() =>
			Array.isArray(value)
				? value
				: Array.isArray(defaultValue)
					? defaultValue
					: [min, max],
		[value, defaultValue, min, max],
	);

	return (
		<SliderPrimitive.Root
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			className={cn(
				[
					// Base
					"relative flex w-full touch-none select-none items-center",
					// Data attributes
					"data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
				],
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn([
					// Base
					"relative grow overflow-hidden rounded-full bg-muted",
					// Data attributes
					"data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
					"data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
				])}
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn([
						// Base
						"absolute bg-primary",
						// Data attributes
						"data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
					])}
				/>
			</SliderPrimitive.Track>
			{Array.from({ length: _values.length }, (_, index) => (
				<SliderPrimitive.Thumb
					data-slot="slider-thumb"
					key={index}
					className={cn([
						// Base
						"block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow]",
						// Hover/Focus
						"hover:ring-4 focus-visible:outline-hidden focus-visible:ring-4",
						// Disabled
						"disabled:pointer-events-none disabled:opacity-50",
					])}
				/>
			))}
		</SliderPrimitive.Root>
	);
}

export { Slider };
