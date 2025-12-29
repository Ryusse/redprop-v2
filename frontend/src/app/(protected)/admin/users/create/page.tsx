"use client";

import { useState } from "react";

import Link from "next/link";

import { Button } from "@src/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Spinner } from "@src/components/ui/spinner";
import { paths } from "@src/lib/paths";
import { useCreateUserForm } from "@src/modules/admin/hooks/use-create-user-form";
import type { CreateUserFormData } from "@src/modules/admin/schemas/create-user";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function CreateUserPage() {
	const [showPassword, setShowPassword] = useState(false);
	const { form, handleSubmit, isSubmitting, error } = useCreateUserForm();

	const onSubmit = async (data: CreateUserFormData) => {
		await handleSubmit(data);
	};

	return (
		<section className="min-h-dvh bg-white">
			<div className="mx-auto max-w-5xl">
				<div className="mb-8 rounded-md px-4 py-4 shadow-create-user">
					<Link
						href={paths.admin.dashboard()}
						className="mb-4 inline-flex items-center text-secondary hover:text-secondary-dark"
					>
						<div className="flex items-center">
							<ArrowLeft className="mr-2 h-4 w-4" />
							<p>Volver a la lista de agentes</p>
						</div>
					</Link>
					<h1 className="font-bold text-3xl text-secondary">Nuevo agente</h1>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6 px-4 shadow-create-user"
					>
						<div className="grid gap-4 gap-x-8 sm:grid-cols-2">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Nombre
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Juan"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Apellido
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Pérez"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Correo electrónico
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="correo@ejemplo.com"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Teléfono
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="04121234567"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Contraseña
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="*********"
													{...field}
													value={field.value || ""}
													className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
												/>
											</FormControl>
											<button
												type="button"
												className="absolute top-1/2 right-2 -translate-y-1/2 text-input-border"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <EyeOff /> : <Eye />}
											</button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="gap-0.5 text-secondary-dark">
											Confirmar contraseña
											<span className="text-danger-normal">*</span>
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="*********"
													{...field}
													value={field.value || ""}
													className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border"
												/>
											</FormControl>
											<button
												type="button"
												className="absolute top-1/2 right-2 -translate-y-1/2 text-input-border"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <EyeOff /> : <Eye />}
											</button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-4">
							<p className="text-blue-800 text-sm">
								<strong>Nota:</strong> Todos los nuevos agentes serán creados
								como <strong>Agentes</strong> (Rol: Agent). Solo los
								administradores existentes pueden modificar los roles
								posteriormente si es necesario.
							</p>
						</div>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<div className="flex flex-col-reverse gap-4 pb-4 sm:flex-row sm:justify-end">
							<Link href={paths.admin.dashboard()}>
								<Button
									className="h-12 cursor-pointer px-6 py-3 text-black max-sm:w-full sm:min-w-36"
									type="button"
									variant="outline"
									disabled={isSubmitting}
								>
									Cancelar
								</Button>
							</Link>
							<Button
								className="h-12 cursor-pointer bg-tertiary px-6 py-3 max-sm:w-full sm:min-w-36"
								type="submit"
								disabled={isSubmitting}
							>
								{isSubmitting && (
									<Spinner className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isSubmitting ? "Guardando..." : "Guardar"}
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}
