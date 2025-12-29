"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@src/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessageWithIcon,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { PhoneInput } from "@src/components/ui/phone-input";
import { Spinner } from "@src/components/ui/spinner";
import { Textarea } from "@src/components/ui/textarea";
import { paths } from "@src/lib/paths";
import {
	type OwnerFormData,
	ownerFormSchema,
} from "@src/modules/clients/schemas/owner-form.schema";
import {
	createClientServerAction,
	deleteClientById,
	updateClientById,
} from "@src/modules/clients/services/clients-service";
import { ClientType } from "@src/modules/clients/services/types";
import PropertySelect from "@src/modules/clients/ui/property-select";
import type { CreateOwner } from "@src/types/clients/owner";
import type { Property } from "@src/types/property";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type OwnerFormProps = {
	availableProperties: Property[];
	onSubmit?: (data: OwnerFormData) => Promise<void> | void;
	initialValues?: Partial<OwnerFormData>;
	clientId?: string;
	leadId?: string;
};

export default function OwnerForm({
	availableProperties,
	onSubmit,
	initialValues,
	clientId,
	leadId,
}: OwnerFormProps) {
	const router = useRouter();

	const form = useForm<OwnerFormData>({
		resolver: zodResolver(ownerFormSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			dni: "",
			phone: "",
			email: "",
			address: "",
			property_id: "",
			notes: "",
			...initialValues,
		},
	});

	const handleSubmit = async (data: OwnerFormData) => {
		try {
			if (onSubmit) {
				await onSubmit(data);
			} else {
				const propertyId =
					data.property_id && data.property_id !== ""
						? Number(data.property_id)
						: undefined;

				const ownerData: Partial<CreateOwner> = {
					first_name: data.first_name,
					last_name: data.last_name,
					phone: data.phone,
					email: data.email,
					dni: data.dni,
					contact_category_id: 3,
					address: data.address,
					notes: data.notes || "",
					...(propertyId !== undefined ? { property_id: propertyId } : {}),
				};

				if (clientId) {
					await updateClientById(clientId, ownerData);
					toast.success("Propietario actualizado exitosamente");
					window.location.href = `/agent/clients/propietarios/${clientId}`;
					return;
				}

				await createClientServerAction(
					ClientType.OWNER,
					ownerData as CreateOwner,
				);

				if (leadId) {
					try {
						await deleteClientById(leadId);
						toast.success("Propietario creado y lead convertido exitosamente");
					} catch (deleteError) {
						console.error("Error eliminando lead:", deleteError);
						toast.error("Propietario creado, pero error al eliminar el lead");
					}
				} else {
					toast.success("Propietario guardado exitosamente");
				}

				router.push(paths.agent.clients.owners.index());
			}
		} catch (error) {
			toast.error("Error al guardar el propietario");
			console.error("Owner form error:", error);
		}
	};

	return (
		<div className="mt-4 w-full rounded-xl p-4 shadow-md/20 lg:max-w-2/3">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Nombre <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Nombre"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Apellido <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Apellido"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="dni"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										DNI <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="12345678"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Teléfono <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<PhoneInput
											defaultCountry="AR"
											countries={["AR"]}
											placeholder="Ingresá un número de teléfono"
											className="text-base [&_button]:rounded-l-lg [&_button]:not-placeholder-shown:border-2 [&_button]:not-placeholder-shown:border-input-active [&_input]:h-12 [&_input]:rounded-r-lg [&_input]:border-input-border/70 [&_input]:not-placeholder-shown:border-2 [&_input]:not-placeholder-shown:border-input-active [&_input]:py-2 [&_input]:text-primary-normal-active [&_input]:shadow-input-border [&_input]:placeholder:text-grey-light [&_input]:focus-visible:border-2 [&_input]:focus-visible:border-input-active [&_input]:focus-visible:shadow-input-active [&_input]:focus-visible:ring-0 [&_input]:aria-invalid:border-danger-normal [&_input]:aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Email <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="email@email.com"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Dirección <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Av. Santa Fe 1234"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<div className="w-1/2 pr-4">
						<FormField
							control={form.control}
							name="property_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Propiedad Asociada
									</FormLabel>
									<FormControl>
										<PropertySelect
											availableProperties={availableProperties}
											operationTypes={[1]}
											value={field.value}
											onChange={(propertyId) => {
												field.onChange(propertyId);
											}}
											placeholder="Seleccione o busque una propiedad"
											className="aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>
					</div>

					<div className="border-t border-t-grey-light pt-4">
						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Agregar nota (opcional)
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Agregar notas adicionales..."
											className="min-h-[100px] resize-none rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-2 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											maxLength={300}
											{...field}
										/>
									</FormControl>
									<div className="flex items-center justify-between">
										<FormMessageWithIcon className="text-xs" />
										<span className="text-gray-500 text-sm">
											{field.value?.length || 0}/300
										</span>
									</div>
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-end gap-3 pt-4">
						<Button
							type="button"
							variant="outline"
							size={"lg"}
							onClick={() => router.back()}
							className="rounded-md"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="rounded-md"
							size={"lg"}
							variant="tertiary"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting && <Spinner />}
							{form.formState.isSubmitting ? "Guardando..." : "Guardar"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
