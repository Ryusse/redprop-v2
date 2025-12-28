import type { Request, Response } from "express";

import type { DashboardServices } from "../services/dashboard.services";
import { ErrorHandlerUtil } from "../shared/error-handler.util";

export class DashboardController {
	constructor(private readonly dashboardServices: DashboardServices) {}

	getDashboard = async (_req: Request, res: Response) => {
		try {
			const result = await this.dashboardServices.getDashboardData();

			return res.status(200).json({
				data: result,
			});
		} catch (error) {
			ErrorHandlerUtil.handleError(error, res, "Dashboard");
		}
	};
}
