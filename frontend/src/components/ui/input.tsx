import { cn } from "@src/lib/utils";

type Props = Omit<React.ComponentProps<"input">, "size"> & {
	size?: "default" | "lg" | "sm";
};

function Input({ className, type, size = "default", ...props }: Props) {
	return (
		<input
			type={type}
			data-slot="input"
			data-size={size}
			className={cn(
				[
					// Base
					"h-12 w-full min-w-0 rounded-md border border-input-border bg-card px-3 py-1 text-base text-input-foreground outline-none transition-[color,box-shadow]",
					// Selection
					"selection:bg-primary selection:text-primary-foreground",
					// Responsive
					"md:text-sm",
				],
				[
					// File
					"file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm",
					// Placeholder
					"placeholder:text-input-placeholder",
					// Focus
					"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
					// Disabled
					"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100",
				],
				// Aria Invalid
				"aria-invalid:border-destructive-foreground aria-invalid:bg-destructive aria-invalid:ring-destructive-foreground/20",
				// Data attributes
				"data-[size=default]:h-10 data-[size=lg]:h-12 data-[size=sm]:h-8",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
