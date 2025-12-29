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
import PropertySelect from "@src/modules/clients/ui/property-select";
import type { CreateTenant } from "@src/types/clients/tenant";
import type { Property } from "@src/types/property";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	type TenantFormData,
	tenantFormSchema,
} from "../../schemas/tenant-form.schema";
import {
	createClientServerAction,
	deleteClientById,
	updateClientById,
} from "../../services/clients-service";
import { ClientType } from "../../services/types";
import DatePickerField from "../../ui/date-picker-field";

type TenantFormProps = {
	availableProperties: Property[];
	onSubmit?: (data: TenantFormData) => Promise<void> | void;
	initialValues?: Partial<TenantFormData>;
	clientId?: string;
	leadId?: string;
};

export default function TenantForm({
	availableProperties,
	onSubmit,
	initialValues,
	clientId,
	leadId,
}: TenantFormProps) {
	const router = useRouter();
	const form = useForm<TenantFormData>({
		resolver: zodResolver(tenantFormSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			dni: "",
			phone: "",
			email: "",
			property_id: "",
			contract_start_date: "",
			contract_end_date: "",
			next_increase_date: "",
			monthly_amount: "",
			notes: "",
			...initialValues,
		},
	});

	const handleSubmit = async (data: TenantFormData) => {
		try {
			if (onSubmit) {
				await onSubmit(data);
			} else {
				const propertyId =
					data.property_id && data.property_id !== ""
						? Number(data.property_id)
						: undefined;

				const tenantData: Partial<CreateTenant> = {
					first_name: data.first_name,
					last_name: data.last_name,
					phone: data.phone,
					email: data.email,
					dni: data.dni,
					contact_category_id: 2,
					rental_interest: true,
					property_interest_phone: data.phone,
					notes: data.notes || "",
					...(propertyId !== undefined ? { property_id: propertyId } : {}),
					contract_start_date: data.contract_start_date,
					contract_end_date: data.contract_end_date,
					next_increase_date: data.next_increase_date,
					monthly_amount: Number(data.monthly_amount),
					currency_type_id: 1,
				};
				if (clientId) {
					await updateClientById(clientId, tenantData);
					toast.success("Inquilino actualizado exitosamente");
					router.push(paths.agent.clients.inquilinos.detail(clientId));
					return;
				}

				await createClientServerAction(
					ClientType.TENANT,
					tenantData as CreateTenant,
				);

				if (leadId) {
					try {
						await deleteClientById(leadId);
						toast.success("Inquilino creado y lead convertido exitosamente");
					} catch (deleteError) {
						console.error("Error eliminando lead:", deleteError);
						toast.error("Inquilino creado, pero error al eliminar el lead");
					}
				} else {
					toast.success("Inquilino guardado exitosamente");
				}

				router.push(paths.agent.clients.inquilinos.index());
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Error al guardar el inquilino";
			toast.error(errorMessage);
			console.error("Tenant form error:", error);
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
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
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
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
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
										DNI
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="12345678"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
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
										Email
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="email@gmail.com"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="property_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Nuevo inmueble
									</FormLabel>
									<FormControl>
										<PropertySelect
											value={field.value}
											onChange={(propertyId, property) => {
												field.onChange(propertyId);
												console.log("Propiedad seleccionada:", property);
											}}
											availableProperties={availableProperties}
											operationTypes={[2]}
											placeholder="Av. Santa Fe 1234"
											className="aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
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
							name="contract_start_date"
							render={({ field }) => (
								<DatePickerField
									value={field.value}
									onChange={field.onChange}
									label="Fecha de inicio de contrato"
									side="bottom"
								/>
							)}
						/>

						<FormField
							control={form.control}
							name="contract_end_date"
							render={({ field }) => (
								<DatePickerField
									value={field.value}
									onChange={field.onChange}
									label="Fecha de fin de contrato"
									side="bottom"
								/>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="next_increase_date"
							render={({ field }) => (
								<DatePickerField
									value={field.value || ""}
									onChange={field.onChange}
									label="Fecha del próximo"
									side="bottom"
								/>
							)}
						/>

						<FormField
							control={form.control}
							name="monthly_amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Monto de alquiler
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											min="0"
											step="1"
											placeholder="$100.000"
											className="h-12 rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
											{...field}
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
											className="min-h-[100px] resize-none rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active py-4 text-base text-primary-normal-active shadow-input-border placeholder:text-grey-light focus-visible:border-2 focus-visible:border-input-active focus-visible:shadow-input-active focus-visible:ring-0 aria-invalid:border-danger-normal aria-invalid:bg-input-danger"
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
