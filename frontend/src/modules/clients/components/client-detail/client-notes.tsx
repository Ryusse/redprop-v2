"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@src/components/ui/button";
import { Card, CardContent } from "@src/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from "@src/components/ui/form";
import { Spinner } from "@src/components/ui/spinner";
import { Textarea } from "@src/components/ui/textarea";
import { updateClientById } from "@src/modules/clients/services/clients-service";
import { FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { type NoteClientFormData, noteClientSchema } from "../../schemas/note";

interface ClientNotesProps {
	notes?: string;
}

export function ClientNotes({
	notes,
	clientId,
}: ClientNotesProps & { clientId: string }) {
	const [isInputActive, setIsInputActive] = useState(false);
	const router = useRouter();

	const form = useForm<NoteClientFormData>({
		resolver: zodResolver(noteClientSchema),
		defaultValues: {
			notes: notes || "",
		},
	});

	async function onSubmit(data: NoteClientFormData) {
		try {
			await updateClientById(clientId, { notes: data.notes });
			toast.success("Nota actualizada correctamente");
			router.refresh();
			setIsInputActive(false);
		} catch (error) {
			console.error(error);
			toast.error("Error al actualizar la nota");
		}
	}

	return (
		<Card>
			<CardContent className="px-4 py-1">
				<h3 className="mb-4 flex items-center gap-2 font-semibold text-lg text-slate-900">
					<FileText className="h-5 w-5" />
					Notas
				</h3>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											className="max-h-[40px] whitespace-pre-wrap border-none bg-slate-50 text-slate-700 text-sm leading-relaxed"
											placeholder="Escribe una nota..."
											{...field}
											onClick={() => setIsInputActive(true)}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="flex">
							<Button
								type="submit"
								className="mt-4 h-8! rounded-md border border-secondary bg-inherit px-6! py-3! text-secondary text-sm shadow-xs hover:bg-outline-hover disabled:cursor-not-allowed disabled:opacity-50"
								disabled={!isInputActive || form.formState.isSubmitting}
							>
								{form.formState.isSubmitting && <Spinner />}
								{form.formState.isSubmitting ? "Guardando..." : "Guardar Nota"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
