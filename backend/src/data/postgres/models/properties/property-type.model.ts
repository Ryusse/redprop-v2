import { PostgresDatabase } from "../../database";

export interface PropertyType {
	id?: number;
	name: string;
}

export interface CreatePropertyTypeDto {
	name: string;
}

export class PropertyTypeModel {
	private static readonly TABLE_NAME = "property_types";

	static async create(data: CreatePropertyTypeDto): Promise<PropertyType> {
		const client = PostgresDatabase.getClient();
		const query = `INSERT INTO ${PropertyTypeModel.TABLE_NAME} (name) VALUES ($1) RETURNING *`;
		const result = await client.query(query, [data.name]);
		return result.rows[0];
	}

	static async findAll(): Promise<PropertyType[]> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PropertyTypeModel.TABLE_NAME} ORDER BY name`;
		const result = await client.query(query);
		return result.rows;
	}

	static async findById(id: number): Promise<PropertyType | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PropertyTypeModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		return result.rows[0] || null;
	}

	static async findByName(name: string): Promise<PropertyType | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PropertyTypeModel.TABLE_NAME} WHERE name = $1`;
		const result = await client.query(query, [name]);
		return result.rows[0] || null;
	}

	static async update(
		id: number,
		updateData: Partial<CreatePropertyTypeDto>,
	): Promise<PropertyType | null> {
		const client = PostgresDatabase.getClient();
		if (!updateData.name) {
			return await PropertyTypeModel.findById(id);
		}
		const query = `UPDATE ${PropertyTypeModel.TABLE_NAME} SET name = $1 WHERE id = $2 RETURNING *`;
		const result = await client.query(query, [updateData.name, id]);
		return result.rows[0] || null;
	}

	static async delete(id: number): Promise<boolean> {
		const client = PostgresDatabase.getClient();
		const query = `DELETE FROM ${PropertyTypeModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		return (result.rowCount ?? 0) > 0;
	}
}
