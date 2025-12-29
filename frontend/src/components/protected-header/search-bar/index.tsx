import { BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { HomeIcon, Search, UserIcon } from "lucide-react";

export default function SearchBar() {
	return (
		<div className="foreground relative mx-auto w-full max-w-xl overflow-hidden rounded-lg bg-card">
			<Button
				variant="link"
				className="absolute top-1/2 left-2 h-auto -translate-y-1/2 p-0 px-0!"
				tabIndex={-1}
			>
				<Search className="h-5 w-5" />
			</Button>
			<Input
				placeholder=""
				className="h-9 pr-28 pl-8 text-foreground"
				type="text"
			/>
			<div className="absolute top-1/2 right-2 grid w-fit -translate-y-1/2 grid-cols-3 items-center bg-card text-foreground">
				<Button variant="ghost" className="h-[30px] w-[30px] px-2!">
					<UserIcon className="h-5 w-5" />
				</Button>
				<Button variant="ghost" className="h-[30px] w-[30px] px-2!">
					<BuildingOfficeIcon className="h-5 w-5" />
				</Button>
				<Button variant="ghost" className="h-[30px] w-[30px] px-2!">
					<HomeIcon className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);
}
