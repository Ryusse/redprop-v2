import type { CreatePropertyAddressDto } from "./create-property-address.dto";
import type { CreatePropertyBasicDto } from "./create-property-basic.dto";
import type { CreatePropertyCharacteristicsDto } from "./create-property-characteristics.dto";
import type { CreatePropertyGeographyDto } from "./create-property-geography.dto";
import type { CreatePropertyInternalDto } from "./create-property-internal.dto";
import type { CreatePropertyServicesDto } from "./create-property-services.dto";
import type { CreatePropertySurfaceDto } from "./create-property-surface.dto";
import type { CreatePropertyValuesDto } from "./create-property-values.dto";

export class CreatePropertyGroupedDto {
	constructor(
		public readonly basic: CreatePropertyBasicDto,
		public readonly geography: CreatePropertyGeographyDto,
		public readonly address: CreatePropertyAddressDto,
		public readonly values: CreatePropertyValuesDto,
		public readonly characteristics?: CreatePropertyCharacteristicsDto,
		public readonly surface?: CreatePropertySurfaceDto,
		public readonly services?: CreatePropertyServicesDto,
		public readonly internal?: CreatePropertyInternalDto,
	) {}

	static create(
		object: Record<string, unknown>,
	): [string?, CreatePropertyGroupedDto?] {
		try {
			const parseJsonField = (
				field: unknown,
				fieldName: string,
			): [string?, unknown?] => {
				if (!field) {
					return [undefined, undefined];
				}

				if (typeof field === "string") {
					try {
						return [undefined, JSON.parse(field)];
					} catch (error) {
						try {
							const fixed = field.replace(/'/g, '"');
							return [undefined, JSON.parse(fixed)];
						} catch {
							const errorMessage =
								error instanceof Error ? error.message : "Invalid JSON format";
							return [
								`Invalid JSON format in ${fieldName}: ${errorMessage}`,
								undefined,
							];
						}
					}
				}

				return [undefined, field];
			};

			let basic: Record<string, unknown> = {};
			let geography: Record<string, unknown> = {};
			let address: Record<string, unknown> = {};
			let characteristics: CreatePropertyCharacteristicsDto | undefined;
			let surface: CreatePropertySurfaceDto | undefined;
			let services: CreatePropertyServicesDto | undefined;
			let values: CreatePropertyValuesDto = { prices: [] };
			let internal: CreatePropertyInternalDto | undefined;

			const basicField = object.basic || object.Basic;
			if (!basicField) {
				return ["basic is required", undefined];
			}

			const [basicError, basicParsed] = parseJsonField(basicField, "basic");
			if (basicError) {
				return [basicError, undefined];
			}
			basic = (basicParsed as Record<string, unknown>) || {};
			console.log(
				"[CreatePropertyGroupedDto] basic after parsing:",
				JSON.stringify(basic),
			);
			console.log(
				"[CreatePropertyGroupedDto] basic.owner_id:",
				basic.owner_id,
				"type:",
				typeof basic.owner_id,
			);

			if (!basic.title || !(basic.title as string).trim()) {
				return ["title is required in basic", undefined];
			}

			const geographyField = object.geography || object.Geography;
			if (!geographyField) {
				return ["geography is required", undefined];
			}

			const [geographyError, geographyParsed] = parseJsonField(
				geographyField,
				"geography",
			);
			if (geographyError) {
				return [geographyError, undefined];
			}
			geography = (geographyParsed as Record<string, unknown>) || {};

			if (!geography.country || !geography.province || !geography.city) {
				return ["geography must include country, province and city", undefined];
			}
			const addressField = object.address || object.Address;
			if (!addressField) {
				return ["address is required", undefined];
			}

			const [addressError, addressParsed] = parseJsonField(
				addressField,
				"address",
			);
			if (addressError) {
				return [addressError, undefined];
			}
			address = (addressParsed as Record<string, unknown>) || {};

			if (!address.street || !(address.street as string).trim()) {
				return ["Address.street is required", undefined];
			}
			const valuesField = object.values || object.Values;
			if (valuesField) {
				const [valuesError, valuesParsed] = parseJsonField(
					valuesField,
					"values",
				);
				if (valuesError) {
					return [valuesError, undefined];
				}
				values = (valuesParsed as CreatePropertyValuesDto) || { prices: [] };
			} else if (object.prices) {
				const [pricesError, pricesParsed] = parseJsonField(
					object.prices,
					"prices",
				);
				if (pricesError) {
					return [pricesError, undefined];
				}
				values = {
					prices: Array.isArray(pricesParsed) ? pricesParsed : [pricesParsed],
				} as CreatePropertyValuesDto;
			}

			if (
				!values.prices ||
				!Array.isArray(values.prices) ||
				values.prices.length === 0
			) {
				return [
					"values.prices is required and must contain at least one price",
					undefined,
				];
			}

			const characteristicsField =
				object.characteristics || object.Characteristics;
			if (characteristicsField) {
				const [charError, charParsed] = parseJsonField(
					characteristicsField,
					"characteristics",
				);
				if (charError) {
					return [charError, undefined];
				}
				characteristics = charParsed as CreatePropertyCharacteristicsDto;
			}

			const surfaceField = object.surface || object.Surface;
			if (surfaceField) {
				const [surfaceError, surfaceParsed] = parseJsonField(
					surfaceField,
					"surface",
				);
				if (surfaceError) {
					return [surfaceError, undefined];
				}
				surface = surfaceParsed as CreatePropertySurfaceDto;
			}

			const servicesField = object.services || object.Services;
			if (servicesField) {
				const [servicesError, servicesParsed] = parseJsonField(
					servicesField,
					"services",
				);
				if (servicesError) {
					return [servicesError, undefined];
				}
				services = servicesParsed as CreatePropertyServicesDto;
			}

			const internalField = object.internal || object.Internal;
			if (internalField) {
				const [internalError, internalParsed] = parseJsonField(
					internalField,
					"internal",
				);
				if (internalError) {
					return [internalError, undefined];
				}
				internal = internalParsed as CreatePropertyInternalDto;
			}

			return [
				undefined,
				new CreatePropertyGroupedDto(
					basic as unknown as CreatePropertyBasicDto,
					geography as unknown as CreatePropertyGeographyDto,
					address as unknown as CreatePropertyAddressDto,
					values,
					characteristics,
					surface,
					services,
					internal,
				),
			];
		} catch (error) {
			console.error("Error parsing CreatePropertyGroupedDto:", error);
			console.error("Request body keys:", Object.keys(object));
			console.error(
				"Request body sample:",
				JSON.stringify(object).substring(0, 500),
			);

			const message =
				error instanceof Error
					? error.message
					: "Error parsing property data. Please check that all JSON fields are properly formatted.";
			return [message, undefined];
		}
	}
}
