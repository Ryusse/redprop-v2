import { cn } from "@src/lib/utils";

export function Section({
	title,
	children,
	className,
}: {
	title: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-lg border bg-card shadow-sm",
				className,
			)}
		>
			<div className="border-b bg-tertiary-light px-6 py-3">
				<h3 className="font-semibold text-heading">{title}</h3>
			</div>
			<div className="p-6">{children}</div>
		</div>
	);
}
