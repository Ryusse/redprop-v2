import { CustomError } from "../errors/custom.error";

export class ProfileEntity {
	constructor(
		public id: number,
		public first_name: string,
		public last_name: string,
		public email: string,
		public password_hash: string,
		public role_id: number,
		public phone?: string,
		public active?: boolean,
		public deleted?: boolean,
		public created_at?: Date,
	) {}

	static fromObject(object: Record<string, unknown>): ProfileEntity {
		const {
			id,
			first_name,
			nombre,
			last_name,
			apellido,
			email,
			password_hash,
			password,
			phone,
			telefono,
			role_id,
			id_rol,
			active,
			activo,
			deleted,
			borrado_logico,
			created_at,
			fecha_creacion,
		} = object;

		const profileId = id;
		const profileFirstName = first_name || nombre;
		const profileLastName = last_name || apellido;
		const profilePassword = password_hash || password;
		const profilePhone = phone || telefono;
		const profileRole = role_id || id_rol;
		const profileActive =
			active !== undefined && active !== null
				? Boolean(active)
				: activo !== undefined && activo !== null
					? Boolean(activo)
					: true;
		const profileDeleted =
			deleted !== undefined && deleted !== null
				? Boolean(deleted)
				: borrado_logico !== undefined && borrado_logico !== null
					? Boolean(borrado_logico)
					: false;
		const profileCreatedAt = created_at || fecha_creacion;

		if (!profileId) throw CustomError.badRequest("Id is required");
		if (!profileFirstName || (profileFirstName as string).trim().length === 0) {
			throw CustomError.badRequest("First name is required");
		}
		if (!profileLastName || (profileLastName as string).trim().length === 0) {
			throw CustomError.badRequest("Last name is required");
		}
		if (!email || (email as string).trim().length === 0) {
			throw CustomError.badRequest("Email is required");
		}
		if (!ProfileEntity.isValidEmail(email as string)) {
			throw CustomError.badRequest("Email format is invalid");
		}
		if (!profilePassword || (profilePassword as string).trim().length === 0) {
			throw CustomError.badRequest("Password is required");
		}
		if (!profileRole) {
			throw CustomError.badRequest("Role is required");
		}

		let createdAt: Date | undefined;

		if (profileCreatedAt) {
			createdAt =
				profileCreatedAt instanceof Date
					? profileCreatedAt
					: new Date(profileCreatedAt as string | number);
			if (Number.isNaN(createdAt.getTime())) {
				throw CustomError.badRequest("Invalid created_at date");
			}
		}

		// Ensure number using casts before checking
		const finalId =
			typeof profileId === "string" ? Number(profileId) : (profileId as number);
		const finalRoleId =
			typeof profileRole === "string"
				? Number(profileRole)
				: (profileRole as number);

		if (Number.isNaN(finalId) || Number.isNaN(finalRoleId)) {
			throw CustomError.badRequest("Invalid id or role_id format");
		}

		return new ProfileEntity(
			finalId,
			(profileFirstName as string).trim(),
			(profileLastName as string).trim(),
			(email as string).trim().toLowerCase(),
			profilePassword as string,
			finalRoleId,
			profilePhone ? (profilePhone as string).trim() : undefined,
			profileActive,
			profileDeleted,
			createdAt,
		);
	}

	get fullName(): string {
		return `${this.first_name} ${this.last_name}`.trim();
	}

	toPublicObject() {
		// const { password_hash: _, ...publicProfile } = this;
		return {
			id: this.id,
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
			phone: this.phone,
			role_id: this.role_id,
			active: this.active,
			created_at: this.created_at,
		};
	}

	private static isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
}
