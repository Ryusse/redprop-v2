import { CircleAlert, House, MessageSquare, UserCheck } from "lucide-react";

import { getDashboardInfo } from "../services/dashboard-info";
import { InfoAgentsCard } from "./info-agents-card";

export async function InfoList() {
	const data = await getDashboardInfo();

	return (
		<ul className="grid grid-cols-2 items-center gap-4 max-[480px]:grid-cols-1 md:gap-6 lg:grid-cols-4">
			<li>
				<InfoAgentsCard
					icon={House}
					title={data?.active_properties || 0}
					description="Propiedades activas"
					className="[&>svg]:bg-success [&>svg]:text-success-foreground"
				/>
			</li>
			<li>
				<InfoAgentsCard
					icon={CircleAlert}
					title={data?.inactive_properties || 0}
					description="Propiedades inactivas"
					className="[&>svg]:bg-danger-light [&>svg]:text-danger-normal"
				/>
			</li>
			<li>
				<InfoAgentsCard
					icon={MessageSquare}
					title={data?.unanswered_consultations || 0}
					description="Consultas no leídas"
					className="[&>svg]:bg-success [&>svg]:text-blue-normal"
				/>
			</li>
			<li>
				<InfoAgentsCard
					icon={UserCheck}
					title={data?.new_leads_today || 0}
					description="Nuevos leads"
					className="[&>svg]:bg-muted [&>svg]:text-header"
				/>
			</li>
		</ul>
	);
}
