import { Button } from "@src/components/ui/button";
import {
	FileUpload,
	FileUploadDropzone,
	FileUploadItem,
	FileUploadItemDelete,
	FileUploadList,
	FileUploadTrigger,
} from "@src/components/ui/file-upload";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@src/components/ui/form";
import { Separator } from "@src/components/ui/separator";
import { Switch } from "@src/components/ui/switch";
import type { PropertyForm } from "@src/types/property";
import { FileText, Trash2, Upload } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

type Props = {
	form: UseFormReturn<PropertyForm>;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function PropertyDocumentsForm({ form }: Props) {
	return (
		<div className="grid gap-6">
			<FormField
				control={form.control}
				name="documents.files"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold text-base text-primary">
							Documentación (opcional)
						</FormLabel>
						<FormControl>
							<FileUpload
								value={field.value || []}
								onValueChange={field.onChange}
								accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg"
								maxFiles={Infinity}
								maxSize={MAX_FILE_SIZE}
								onFileReject={(_, message) => {
									let error = message;
									if (message === "File too large") {
										error =
											"El archivo es demasiado grande. El tamaño máximo es 5MB.";
									} else if (message === "File type not accepted") {
										error = "Tipo de archivo no aceptado.";
									}
									form.setError("documents.files", {
										message: error,
									});
								}}
								multiple
							>
								<div className="grid gap-6">
									<FileUploadDropzone className="w-fit border-none bg-transparent p-0">
										<FileUploadTrigger asChild>
											<Button
												variant="outline-blue-normal"
												className="h-11 gap-2 px-4"
											>
												<Upload className="size-4" />
												Subir archivo
											</Button>
										</FileUploadTrigger>
									</FileUploadDropzone>

									<FileUploadList className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										{field.value?.map((file, index) => (
											<FileUploadItem
												key={`${file.name}-${index}`}
												value={file}
												className="relative flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
											>
												<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-tertiary">
													<FileText className="size-5" />
												</div>
												<div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
													<span className="truncate pr-6 font-medium text-sm leading-none">
														{file.name}
													</span>
													<span className="truncate text-muted-foreground text-xs">
														{(file.size / 1024 / 1024).toFixed(2)} MB
													</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="rounded bg-gray-100 px-2 py-1 font-semibold text-[10px] text-gray-500 uppercase">
														{file.type.split("/")[1] || "FILE"}
													</span>
													<FileUploadItemDelete asChild>
														<Button
															variant="ghost"
															size="icon"
															className="top-2 right-2 size-6 text-muted-foreground hover:text-destructive sm:relative sm:top-0 sm:right-0 sm:size-8 lg:absolute"
														>
															<Trash2 className="size-4" />
															<span className="sr-only">Eliminar</span>
														</Button>
													</FileUploadItemDelete>
												</div>
											</FileUploadItem>
										))}
									</FileUploadList>
								</div>
							</FileUpload>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<Separator />

			<FormField
				control={form.control}
				name="basic.featured_web"
				render={({ field }) => (
					<FormItem className="flex flex-row items-center justify-between">
						<div className="space-y-1">
							<FormLabel className="font-semibold text-primary lg:text-xl">
								Publicar en la web
							</FormLabel>
							<FormDescription className="text-base">
								La propiedad aparecerá en la landing page
							</FormDescription>
						</div>
						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					</FormItem>
				)}
			/>
		</div>
	);
}
