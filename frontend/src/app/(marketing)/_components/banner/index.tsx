import Image from "next/image";
import Link from "next/link";

import BannerImage from "@public/images/banner.avif";
import MainLayout from "@src/components/layouts/main-layout";
import { Button } from "@src/components/ui/button";
import { Heading } from "@src/components/ui/heading";
import { paths } from "@src/lib/paths";

export default function Banner() {
	return (
		<section className="relative py-40">
			<Image
				src={BannerImage}
				fill
				className="absolute aspect-video h-full w-full object-cover"
				alt="Banner"
			/>
			<MainLayout className="relative z-10 flex flex-col gap-6">
				<Heading variant="h2" className="text-center">
					¿Querés vender o alquilar tu casa?
				</Heading>
				<Button
					size="lg"
					variant="default"
					asChild
					className="mx-auto w-full max-w-[167px]"
				>
					<Link href={paths.public.contact()}>Contáctanos</Link>
				</Button>
			</MainLayout>
		</section>
	);
}
