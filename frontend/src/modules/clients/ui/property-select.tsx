"use client";

import { useMemo, useState } from "react";

import { Button } from "@src/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@src/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@src/components/ui/popover";
import { cn } from "@src/lib/utils";
import type { Property } from "@src/types/property";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

type PropertySelectProps = {
	availableProperties: Property[];
	operationTypes?: number[]; // [1] = venta, [2] = alquiler, [1,2] = ambas
	value?: string;
	onChange: (propertyId: string, property: Property) => void;
	placeholder?: string;
	className?: string;
};

export default function PropertySelect({
	availableProperties,
	operationTypes = [1, 2],
	value = "",
	onChange,
	placeholder = "Seleccionar propiedad",
	className = "",
}: PropertySelectProps) {
	const [open, setOpen] = useState(false);

	const filteredProperties = useMemo(() => {
		return availableProperties.filter(
			(property) =>
				property.property_status?.id === 1 &&
				property.visibility_status?.id === 1 &&
				operationTypes.includes(property.main_price?.operation_type?.id ?? 0),
		);
	}, [availableProperties, operationTypes]);

	const selectedProperty = availableProperties.find(
		(p) => p.id.toString() === value,
	);

	const buttonText = selectedProperty
		? selectedProperty.main_address.full_address
		: placeholder;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="combobox"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between rounded-lg border-input-border/70 py-2 shadow-input-border focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0",
						value && "border-2 border-input-active text-primary-normal-active",
						!value && "text-grey-light",
						className,
					)}
				>
					{buttonText}
					<ChevronsUpDownIcon className="ml-2 size-5 shrink-0 text-input-foreground" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" sideOffset={4}>
				<Command className="w-full">
					<CommandInput placeholder="Buscar propiedad..." />
					<CommandList className="max-h-[300px]">
						<CommandEmpty>No se encontraron propiedades.</CommandEmpty>

						<CommandGroup>
							{filteredProperties.map((property) => (
								<CommandItem
									className="justify-between truncate"
									value={property.id.toString()}
									key={property.id}
									onSelect={() => {
										onChange(property.id.toString(), property);
										setOpen(false);
									}}
								>
									<div className="flex min-w-0 flex-1 flex-col items-start">
										<span className="truncate font-medium">
											{property.main_address.full_address}
										</span>
									</div>
									<CheckIcon
										className={cn(
											"ml-2 h-4 w-4 shrink-0",
											property.id.toString() === value
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
