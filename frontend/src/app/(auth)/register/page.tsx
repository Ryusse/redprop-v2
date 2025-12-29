import type { Metadata } from "next";

import RegisterForm from "@src/modules/auth/components/register-form";

export const metadata: Metadata = {
	title: "Registro",
	description: "Crea tu cuenta en nuestra app",
};

export default function RegisterPage() {
	return (
		<section className="flex min-h-screen flex-col bg-primary-foreground">
			<main className="relative z-10 m-auto flex w-full flex-1 items-center justify-center">
				<RegisterForm />
			</main>
		</section>
	);
}
