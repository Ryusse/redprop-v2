"use client";

import { Button } from "@src/components/ui/button";
import { Calendar } from "@src/components/ui/calendar";
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessageWithIcon,
} from "@src/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@src/components/ui/popover";
import { cn } from "@src/lib/utils";
import { format, formatISO, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

type DatePickerFieldProps = {
	value: string;
	onChange: (value: string) => void;
	label: string;
	placeholder?: string;
	required?: boolean;
	side?: "top" | "right" | "bottom" | "left";
};

export default function DatePickerField({
	value,
	onChange,
	label,
	placeholder = "dd/mm/aaaa",
	required = false,
	side = "bottom",
}: DatePickerFieldProps) {
	return (
		<FormItem className="flex flex-col">
			<FormLabel className="font-semibold text-secondary-dark">
				{label} {required && <span className="text-danger-normal">*</span>}
			</FormLabel>
			<Popover>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							variant="outline"
							className={cn(
								"h-12 rounded-lg border-input-border/70 py-2 pl-3 text-left font-normal shadow-input-border hover:border-input-active hover:bg-transparent focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0",
								value &&
									"border-2 border-input-active text-primary-normal-active",
								!value && "text-grey-light",
							)}
						>
							{value ? (
								format(parseISO(value), "dd/MM/yyyy", { locale: es })
							) : (
								<span>{placeholder}</span>
							)}
							<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent
					className="flex w-full justify-center p-0"
					align="start"
					side={side}
					avoidCollisions={false}
				>
					<Calendar
						mode="single"
						selected={value ? parseISO(value) : undefined}
						onSelect={(date) =>
							onChange(date ? formatISO(date, { representation: "date" }) : "")
						}
						locale={es}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<FormMessageWithIcon className="text-xs" />
		</FormItem>
	);
}
