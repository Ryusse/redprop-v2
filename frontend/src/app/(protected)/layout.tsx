import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import MainLayout from "@src/components/layouts/main-layout";
import ProtectedHeader from "@src/components/protected-header";
import ProtectedSidebar from "@src/components/sidebars/protected-sidebar";
import { SidebarInset, SidebarProvider } from "@src/components/ui/sidebar";
import { paths } from "@src/lib/paths";
import { getCurrentUser, verifySession } from "@src/modules/auth";

type Props = {
	children: ReactNode;
};

export default async function AdminLayout({ children }: Props) {
	const { isAuth } = await verifySession();
	const user = await getCurrentUser();

	if (!isAuth) {
		redirect(paths.auth.login());
	}

	if (!user) {
		return null;
	}

	return (
		<SidebarProvider header={<ProtectedHeader />} className="">
			<ProtectedSidebar role={user.role} />
			<SidebarInset className="relative h-[calc(100dvh-(var(--admin-header-height-mobile)))] w-full items-center overflow-y-auto rounded-r-2xl rounded-b-none rounded-l-2xl border-tertiary border-t border-r border-l bg-card p-4 md:rounded-r-none md:border-r-0 lg:h-[calc(100dvh-(var(--admin-header-height)))] lg:p-8">
				<MainLayout
					size="lg"
					className="mx-0 flex w-full! flex-1 flex-col gap-4 px-0 lg:gap-8"
				>
					{children}
				</MainLayout>
			</SidebarInset>
		</SidebarProvider>
	);
}
