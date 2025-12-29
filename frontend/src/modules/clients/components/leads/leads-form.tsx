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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@src/components/ui/select";
import { Spinner } from "@src/components/ui/spinner";
import { Textarea } from "@src/components/ui/textarea";
import { paths } from "@src/lib/paths";
import PropertySelect from "@src/modules/clients/ui/property-select";
import type { CreateLead } from "@src/types/clients/lead";
import type { Property } from "@src/types/property";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	type ContactFormData,
	contactFormSchema,
} from "../../schemas/contact-form.schema";
import {
	createClientServerAction,
	updateClientById,
} from "../../services/clients-service";
import { ClientType } from "../../services/types";

type ContactFormProps = {
	availableProperties: Property[];
	onSubmit?: (data: ContactFormData) => Promise<void> | void;
	initialValues?: Partial<ContactFormData>;
	clientId?: string;
};

export default function LeadsForm({
	availableProperties,
	onSubmit,
	initialValues,
	clientId,
}: ContactFormProps) {
	const router = useRouter();

	const defaultValues: ContactFormData = {
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		consultation_type_id: 1,
		notes: "",
		property_id: "",
		...initialValues,
	};

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues,
	});

	const handleSubmit = async (data: ContactFormData) => {
		try {
			if (onSubmit) {
				await onSubmit(data);
				return;
			}

			const payload: Partial<CreateLead> = {
				first_name: data.first_name,
				last_name: data.last_name,
				phone: data.phone,
				email: data.email,
				contact_category_id: 1,
				notes: data.notes || "",
				property_id: data.property_id
					? Number.isNaN(Number(data.property_id))
						? undefined
						: Number(data.property_id)
					: undefined,
			};

			if (clientId) {
				await updateClientById(clientId, payload);
				toast.success("Contacto actualizado exitosamente");
				router.push(`/agent/clients/leads/${clientId}`);
				return;
			}

			await createClientServerAction(ClientType.LEAD, payload as CreateLead);
			toast.success("Contacto guardado exitosamente");
			router.push(paths.agent.clients.leads.index());
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Error al guardar el contacto";
			toast.error(errorMessage);
			console.error("Contact form error:", error);
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
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Teléfono <span className="text-danger-normal">*</span>
									</FormLabel>
									<FormControl>
										<PhoneInput
											defaultCountry="AR"
											countries={["AR", "UY", "CL", "BR", "PY"]}
											placeholder="Ingresá un número de teléfono"
											className="text-base [&_button]:rounded-l-lg [&_button]:not-placeholder-shown:border-2 [&_button]:not-placeholder-shown:border-input-active [&_input]:h-12 [&_input]:rounded-r-lg [&_input]:border-input-border/70 [&_input]:not-placeholder-shown:border-2 [&_input]:not-placeholder-shown:border-input-active [&_input]:py-2 [&_input]:text-primary-normal-active [&_input]:shadow-input-border [&_input]:placeholder:text-grey-light [&_input]:focus-visible:border-2 [&_input]:focus-visible:border-input-active [&_input]:focus-visible:shadow-input-active [&_input]:focus-visible:ring-0 [&_input]:aria-invalid:border-danger-normal [&_input]:aria-invalid:bg-input-danger"
											{...field}
										/>
									</FormControl>
									<FormMessageWithIcon className="text-xs" />
								</FormItem>
							)}
						/>{" "}
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
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="consultation_type_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-secondary-dark">
										Tipo de consulta
									</FormLabel>
									<Select
										value={field.value ? String(field.value) : undefined}
										onValueChange={(value) => field.onChange(Number(value))}
									>
										<FormControl>
											<SelectTrigger className="h-12 w-full rounded-lg border-input-border/70 not-placeholder-shown:border-2 not-placeholder-shown:border-input-active text-base text-primary-normal-active shadow-input-border focus:border-2 focus:border-input-active focus:shadow-input-active focus:ring-0 data-placeholder:text-grey-light">
												<SelectValue placeholder="Seleccione tipo de consulta" />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-dropdown-background">
											<SelectItem value="1">Consulta General</SelectItem>
											<SelectItem value="3">Consulta por Alquiler</SelectItem>
											<SelectItem value="2">Consulta por Compra</SelectItem>
											<SelectItem value="4">Consulta por Venta</SelectItem>
										</SelectContent>
									</Select>
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
										Propiedad de interés
									</FormLabel>
									<FormControl>
										<PropertySelect
											value={field.value}
											onChange={(propertyId, _property) => {
												field.onChange(propertyId);
											}}
											availableProperties={availableProperties}
											operationTypes={[1, 2]}
											placeholder="Av. Santa Fe 1234"
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
							size={"lg"}
							variant="outline"
							onClick={() => router.back()}
							className="rounded-md"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							size={"lg"}
							className="rounded-md"
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
