import type { Metadata } from "next";

import LoginForm from "@src/modules/auth/components/login-form";
export const metadata: Metadata = {
	title: "Login",
	description: "Inicia sesión en nuestra app",
};
export default function LoginPage() {
	return (
		<section className="flex min-h-screen flex-col bg-primary-foreground">
			<main className="relative z-10 m-auto flex w-full flex-1 items-center justify-center">
				<LoginForm />
			</main>
		</section>
	);
}
