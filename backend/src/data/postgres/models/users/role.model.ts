import { PostgresDatabase } from "../../database";

export interface Role {
	id?: number;
	name: string;
}

export interface CreateRoleDto {
	name: string;
}

export class RoleModel {
	private static readonly TABLE_NAME = "roles";

	static async create(data: CreateRoleDto): Promise<Role> {
		const client = PostgresDatabase.getClient();
		const query = `INSERT INTO ${RoleModel.TABLE_NAME} (name) VALUES ($1) RETURNING *`;
		const result = await client.query(query, [data.name]);
		const row = result.rows[0];

		return {
			...row,
			name: row.name,
		};
	}

	static async findAll(): Promise<Role[]> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${RoleModel.TABLE_NAME} ORDER BY name`;
		const result = await client.query(query);
		return result.rows.map((row) => ({
			...row,
			name: row.name,
		}));
	}

	static async findById(id: number | string): Promise<Role | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${RoleModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		const row = result.rows[0];
		if (!row) return null;

		return {
			...row,
			name: row.name,
		};
	}

	static async findByName(name: string): Promise<Role | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${RoleModel.TABLE_NAME} WHERE name = $1`;
		const result = await client.query(query, [name]);
		const row = result.rows[0];
		if (!row) return null;

		return {
			...row,
			name: row.name,
		};
	}

	static async findByNombre(nombre: string): Promise<Role | null> {
		return RoleModel.findByName(nombre);
	}

	static async findByTitle(title: string): Promise<Role | null> {
		return RoleModel.findByName(title);
	}

	static async update(
		id: number | string,
		updateData: Partial<CreateRoleDto>,
	): Promise<Role | null> {
		const client = PostgresDatabase.getClient();
		if (!updateData.name) {
			return await RoleModel.findById(id);
		}
		const query = `UPDATE ${RoleModel.TABLE_NAME} SET name = $1 WHERE id = $2 RETURNING *`;
		const result = await client.query(query, [updateData.name, id]);
		const row = result.rows[0];
		if (!row) return null;

		return {
			...row,
			name: row.name,
		};
	}

	static async delete(id: number | string): Promise<boolean> {
		const client = PostgresDatabase.getClient();
		const query = `DELETE FROM ${RoleModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		return (result.rowCount ?? 0) > 0;
	}
}
