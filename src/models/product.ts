import client from '../database';

export interface Product {
  id?: number;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  // get products
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products. Error: ${error}`);
    }
  }

  // get product
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get product. Error: ${error}`);
    }
  }

  // insert product
  async create(product: Product): Promise<Product> {
    try {
      const { name, price, category } = product;
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [name, price, category]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert product. Error: ${error}`);
    }
  }
}
