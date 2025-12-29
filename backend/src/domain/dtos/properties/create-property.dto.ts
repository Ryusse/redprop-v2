import { CreatePropertyAddressDto } from "./create-property-address.dto";
import { CreatePropertyGeographyDto } from "./create-property-geography.dto";
import { CreatePropertyPriceDto } from "./create-property-price.dto";

export class CreatePropertyDto {
	constructor(
		public readonly title: string,
		public readonly property_type_id: number | undefined,
		public readonly property_type: string | undefined,
		public readonly property_status_id: number | undefined,
		public readonly property_status: string | undefined,
		public readonly visibility_status_id: number | undefined,
		public readonly visibility_status: string | undefined,

		public readonly geography: CreatePropertyGeographyDto,
		public readonly address: CreatePropertyAddressDto,

		public readonly prices: CreatePropertyPriceDto[],
		public readonly owner_id?: number,
		public readonly description?: string,
		public readonly publication_date?: Date | string,
		public readonly featured_web?: boolean,
		public readonly bedrooms_count?: number,
		public readonly bathrooms_count?: number,
		public readonly rooms_count?: number,
		public readonly toilets_count?: number,
		public readonly parking_spaces_count?: number,
		public readonly floors_count?: number,
		public readonly land_area?: number,
		public readonly semi_covered_area?: number,
		public readonly covered_area?: number,
		public readonly total_built_area?: number,
		public readonly uncovered_area?: number,
		public readonly total_area?: number,
		public readonly zoning?: string,
		public readonly situation_id?: number,
		public readonly situation?: string,
		public readonly age_id?: number,
		public readonly age?: string,
		public readonly orientation_id?: number,
		public readonly orientation?: string,
		public readonly disposition_id?: number,
		public readonly disposition?: string,
		public readonly branch_name?: string,
		public readonly appraiser?: string,
		public readonly producer?: string,
		public readonly maintenance_user?: string,
		public readonly keys_location?: string,
		public readonly internal_comments?: string,
		public readonly social_media_info?: string,
		public readonly operation_commission_percentage?: number,
		public readonly producer_commission_percentage?: number,
	) {}

	static create(
		object: Record<string, unknown>,
	): [string?, CreatePropertyDto?] {
		let propertyDetails: Record<string, unknown> = {};
		if (typeof object.propertyDetails === "string") {
			try {
				propertyDetails = JSON.parse(object.propertyDetails);
			} catch {
				return ["Invalid propertyDetails format", undefined];
			}
		} else if (
			typeof object.propertyDetails === "object" &&
			object.propertyDetails !== null
		) {
			propertyDetails = object.propertyDetails as Record<string, unknown>;
		}

		let geographyData: Record<string, unknown> = {};
		if (typeof object.geography === "string") {
			try {
				geographyData = JSON.parse(object.geography);
			} catch {
				return ["Invalid geography JSON format", undefined];
			}
		} else if (
			typeof object.geography === "object" &&
			object.geography !== null
		) {
			geographyData = object.geography as Record<string, unknown>;
		}

		let addressData: Record<string, unknown> = {};
		if (typeof object.address === "string") {
			try {
				addressData = JSON.parse(object.address);
			} catch {
				return ["Invalid address JSON format", undefined];
			}
		} else if (typeof object.address === "object" && object.address !== null) {
			addressData = object.address as Record<string, unknown>;
		}

		let pricesData: unknown[] = [];
		if (typeof object.prices === "string") {
			try {
				const parsed = JSON.parse(object.prices);
				if (Array.isArray(parsed)) {
					pricesData = parsed;
				} else {
					return ["Prices must be an array", undefined];
				}
			} catch {
				return ["Invalid prices JSON format", undefined];
			}
		} else if (Array.isArray(object.prices)) {
			pricesData = object.prices;
		}

		// Helper to safely get string from either source
		const getString = (key: string): string | undefined => {
			const val = propertyDetails[key] || object[key];
			return typeof val === "string" ? val : undefined;
		};

		// Helper to safely get number from either source
		const getNumber = (key: string): number | undefined => {
			const val = propertyDetails[key] || object[key];
			if (typeof val === "number") return val;
			if (typeof val === "string" && val.trim() !== "") {
				const num = Number(val);
				return Number.isNaN(num) ? undefined : num;
			}
			return undefined;
		};

		const title = getString("title");
		if (!title || title.trim().length === 0) {
			return ["Title is required", undefined];
		}

		const propertyTypeId = getNumber("property_type_id");
		const propertyTypeName = getString("property_type");
		const hasPropertyTypeId = propertyTypeId !== undefined;
		const hasPropertyTypeName = propertyTypeName !== undefined;

		if (!hasPropertyTypeId && !hasPropertyTypeName) {
			return ["Property type ID or property type name is required", undefined];
		}
		if (hasPropertyTypeId && hasPropertyTypeName) {
			return [
				"Provide either property_type_id OR property_type name, not both",
				undefined,
			];
		}

		const propertyStatusId = getNumber("property_status_id");
		const propertyStatusName = getString("property_status");
		const hasPropertyStatusId = propertyStatusId !== undefined;
		const hasPropertyStatusName = propertyStatusName !== undefined;

		if (!hasPropertyStatusId && !hasPropertyStatusName) {
			return [
				"Property status ID or property status name is required",
				undefined,
			];
		}
		if (hasPropertyStatusId && hasPropertyStatusName) {
			return [
				"Provide either property_status_id OR property_status name, not both",
				undefined,
			];
		}

		const visibilityStatusId = getNumber("visibility_status_id");
		const visibilityStatusName = getString("visibility_status");
		const hasVisibilityStatusId = visibilityStatusId !== undefined;
		const hasVisibilityStatusName = visibilityStatusName !== undefined;

		if (!hasVisibilityStatusId && !hasVisibilityStatusName) {
			return [
				"Visibility status ID or visibility status name is required",
				undefined,
			];
		}
		if (hasVisibilityStatusId && hasVisibilityStatusName) {
			return [
				"Provide either visibility_status_id OR visibility_status name, not both",
				undefined,
			];
		}

		const [geoError, geography] =
			CreatePropertyGeographyDto.create(geographyData);
		if (geoError || !geography) {
			return [geoError || "Invalid geography data", undefined];
		}
		const [addrError, address] = CreatePropertyAddressDto.create(addressData);
		if (addrError || !address) {
			return [addrError || "Invalid address data", undefined];
		}
		if (!pricesData || pricesData.length === 0) {
			return ["At least one price is required", undefined];
		}

		const ownerId = getNumber("owner_id");

		const prices: CreatePropertyPriceDto[] = [];
		for (let i = 0; i < pricesData.length; i++) {
			const item = pricesData[i];
			if (typeof item !== "object" || item === null) {
				return [`Price ${i + 1}: Invalid format`, undefined];
			}
			const [priceError, price] = CreatePropertyPriceDto.create(
				item as Record<string, unknown>,
			);
			if (priceError || !price) {
				return [
					`Price ${i + 1}: ${priceError || "Invalid price data"}`,
					undefined,
				];
			}
			prices.push(price);
		}

		const validateOptionalNumber = (key: string): number | undefined => {
			const val = propertyDetails[key] || object[key];
			if (val === undefined || val === null || val === "") {
				return undefined;
			}
			const num = Number(val);
			if (Number.isNaN(num) || num < 0) {
				// We can't throw here because we want to return the error message pair
				// But original code threw error. We will mimic strict check by returning undefined if invalid?
				// Actually the original code threw error which was caught later.
				// Let's throw to match structure or handle gracefully.
				throw new Error(`${key} must be a positive number`);
			}
			return num;
		};

		try {
			const situationId = getNumber("situation_id");
			const situationName = getString("situation");
			const hasSituationId = situationId !== undefined;
			const hasSituationName = situationName !== undefined;
			if (hasSituationId && hasSituationName) {
				return [
					"Provide either situation_id OR situation name, not both",
					undefined,
				];
			}

			const ageId = getNumber("age_id");
			const ageName = getString("age");
			const hasAgeId = ageId !== undefined;
			const hasAgeName = ageName !== undefined;
			if (hasAgeId && hasAgeName) {
				return ["Provide either age_id OR age name, not both", undefined];
			}

			const orientationId = getNumber("orientation_id");
			const orientationName = getString("orientation");
			const hasOrientationId = orientationId !== undefined;
			const hasOrientationName = orientationName !== undefined;
			if (hasOrientationId && hasOrientationName) {
				return [
					"Provide either orientation_id OR orientation name, not both",
					undefined,
				];
			}

			const dispositionId = getNumber("disposition_id");
			const dispositionName = getString("disposition");
			const hasDispositionId = dispositionId !== undefined;
			const hasDispositionName = dispositionName !== undefined;
			if (hasDispositionId && hasDispositionName) {
				return [
					"Provide either disposition_id OR disposition name, not both",
					undefined,
				];
			}

			let publicationDate: Date | undefined;
			const dateValue =
				propertyDetails.publication_date || object.publication_date;
			if (dateValue) {
				if (typeof dateValue === "string") {
					publicationDate = new Date(dateValue);
					if (Number.isNaN(publicationDate.getTime())) {
						return [
							"Invalid publication_date format. Use ISO date string (YYYY-MM-DD)",
							undefined,
						];
					}
				} else if (dateValue instanceof Date) {
					publicationDate = dateValue;
				}
			}

			let featuredWeb: boolean | undefined;
			const featVal =
				propertyDetails.featured_web !== undefined
					? propertyDetails.featured_web
					: object.featured_web;

			if (featVal !== undefined) {
				if (typeof featVal === "boolean") {
					featuredWeb = featVal;
				} else if (typeof featVal === "string") {
					featuredWeb = featVal.toLowerCase() === "true";
				}
			}

			return [
				undefined,
				new CreatePropertyDto(
					title?.trim(),
					propertyTypeId,
					propertyTypeName?.trim(),
					propertyStatusId,
					propertyStatusName?.trim(),
					visibilityStatusId,
					visibilityStatusName?.trim(),
					geography,
					address,
					prices,
					ownerId,
					getString("description")?.trim(),
					publicationDate,
					featuredWeb,
					validateOptionalNumber("bedrooms_count"),
					validateOptionalNumber("bathrooms_count"),
					validateOptionalNumber("rooms_count"),
					validateOptionalNumber("toilets_count"),
					validateOptionalNumber("parking_spaces_count"),
					validateOptionalNumber("floors_count"),
					validateOptionalNumber("land_area"),
					validateOptionalNumber("semi_covered_area"),
					validateOptionalNumber("covered_area"),
					validateOptionalNumber("total_built_area"),
					validateOptionalNumber("uncovered_area"),
					validateOptionalNumber("total_area"),
					getString("zoning")?.trim(),
					situationId,
					situationName?.trim(),
					ageId,
					ageName?.trim(),
					orientationId,
					orientationName?.trim(),
					dispositionId,
					dispositionName?.trim(),
					getString("branch_name")?.trim(),
					getString("appraiser")?.trim(),
					getString("producer")?.trim(),
					getString("maintenance_user")?.trim(),
					getString("keys_location")?.trim(),
					getString("internal_comments")?.trim(),
					getString("social_media_info")?.trim(),
					validateOptionalNumber("operation_commission_percentage"),
					validateOptionalNumber("producer_commission_percentage"),
				),
			];
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Invalid property data";
			return [message, undefined];
		}
	}
}
