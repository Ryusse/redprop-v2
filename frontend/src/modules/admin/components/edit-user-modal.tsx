"use client";

import { useState } from "react";

import { Button } from "@src/components/ui/button";
import { Checkbox } from "@src/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@src/components/ui/dialog";
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
import { Eye, EyeOff } from "lucide-react";

import { useEditUserForm } from "../hooks/use-edit-user-form";
import type { EditUserFormData } from "../schemas/edit-user";
import type { EditUserModalProps } from "../types";

export function EditUserModal({
	user,
	onUserUpdated,
	open,
	onOpenChange,
}: EditUserModalProps) {
	const [showPassword, setShowPassword] = useState(false);
	const { form, handleSubmit, isSubmitting, error, isAdmin } =
		useEditUserForm(user);

	const onSubmit = async (data: EditUserFormData) => {
		const result = await handleSubmit(data);
		if (result.success) {
			onOpenChange?.(false);
			if (onUserUpdated) {
				onUserUpdated();
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[85vh] overflow-y-auto bg-white sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-3xl text-secondary max-sm:text-2xl">
						Editar agente
					</DialogTitle>
					<DialogDescription className="font-medium text-base text-muted-foreground max-sm:text-sm">
						Modifique los detalles del agente {user.first_name} {user.last_name}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 sm:space-y-4"
					>
						<div className="grid gap-4 gap-x-8 min-[480px]:grid-cols-2">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Nombre
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Ej: Juan"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
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
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Apellido
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Ej: Pérez"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
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
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Correo electrónico
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="correo@ejemplo.com"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
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
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Teléfono
										</FormLabel>
										<FormControl>
											<Input
												placeholder="04121234567"
												{...field}
												value={field.value || ""}
												className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
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
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Contraseña
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Jane Doe"
													{...field}
													value={field.value || ""}
													className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
												/>
											</FormControl>
											<button
												type="button"
												className="absolute top-1/2 right-2 -translate-y-1/2"
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
										<FormLabel className="text-secondary-dark max-sm:text-sm">
											Confirmar contraseña
										</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Jane Doe"
													{...field}
													value={field.value || ""}
													className="h-10 border border-input-border shadow-input-border placeholder:text-pagination-border max-sm:text-sm"
												/>
											</FormControl>
											<button
												type="button"
												className="absolute top-1/2 right-2 -translate-y-1/2"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? <EyeOff /> : <Eye />}
											</button>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{isAdmin && (
								<>
									<FormField
										control={form.control}
										name="role"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Rol</FormLabel>
												<FormControl>
													<div className="flex gap-4">
														<label className="flex items-center gap-2 max-sm:text-sm">
															<input
																type="radio"
																value="admin"
																checked={field.value === "admin"}
																onChange={() => field.onChange("admin")}
																className="h-4 w-4 max-sm:text-sm"
															/>
															Administrador
														</label>
														<label className="flex items-center gap-2 max-sm:text-sm">
															<input
																type="radio"
																value="agent"
																checked={field.value === "agent"}
																onChange={() => field.onChange("agent")}
																className="h-4 w-4 max-sm:text-sm"
															/>
															Agente
														</label>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="active"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0">
												<FormControl>
													<Checkbox
														checked={field.value || false}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormLabel>Agente activo</FormLabel>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
						</div>

						{error && <p className="text-red-500 text-sm">{error}</p>}

						<DialogFooter className="mt-12 max-sm:flex-col">
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting && (
									<Spinner className="mr-2 h-4 w-4 animate-spin max-sm:text-sm" />
								)}
								{isSubmitting ? "Guardando..." : "Guardar cambios"}
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange?.(false)}
								disabled={isSubmitting}
								className="max-sm:text-sm"
							>
								Cancelar
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
