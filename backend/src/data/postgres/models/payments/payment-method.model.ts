import { PostgresDatabase } from "../../database";

export interface PaymentMethod {
	id?: number;
	name: string;
}

export interface CreatePaymentMethodDto {
	name: string;
}

export class PaymentMethodModel {
	private static readonly TABLE_NAME = "payment_methods";

	static async create(data: CreatePaymentMethodDto): Promise<PaymentMethod> {
		const client = PostgresDatabase.getClient();
		const query = `INSERT INTO ${PaymentMethodModel.TABLE_NAME} (name) VALUES ($1) RETURNING *`;
		const result = await client.query(query, [data.name]);
		return result.rows[0];
	}

	static async findAll(): Promise<PaymentMethod[]> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PaymentMethodModel.TABLE_NAME} ORDER BY name`;
		const result = await client.query(query);
		return result.rows;
	}

	static async findById(id: number): Promise<PaymentMethod | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PaymentMethodModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		return result.rows[0] || null;
	}

	static async findByName(name: string): Promise<PaymentMethod | null> {
		const client = PostgresDatabase.getClient();
		const query = `SELECT * FROM ${PaymentMethodModel.TABLE_NAME} WHERE name = $1`;
		const result = await client.query(query, [name]);
		return result.rows[0] || null;
	}

	static async update(
		id: number,
		updateData: Partial<CreatePaymentMethodDto>,
	): Promise<PaymentMethod | null> {
		const client = PostgresDatabase.getClient();
		if (!updateData.name) {
			return await PaymentMethodModel.findById(id);
		}
		const query = `UPDATE ${PaymentMethodModel.TABLE_NAME} SET name = $1 WHERE id = $2 RETURNING *`;
		const result = await client.query(query, [updateData.name, id]);
		return result.rows[0] || null;
	}

	static async delete(id: number): Promise<boolean> {
		const client = PostgresDatabase.getClient();
		const query = `DELETE FROM ${PaymentMethodModel.TABLE_NAME} WHERE id = $1`;
		const result = await client.query(query, [id]);
		return (result.rowCount ?? 0) > 0;
	}
}
