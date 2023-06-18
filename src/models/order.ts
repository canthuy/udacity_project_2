import client from '../database';

export interface Order {
  id?: number;
  productId: number;
  userId: number;
  quantity: number;
  status: string;
}

export class OrderStore {
  // get current order by user
  async getCurrentOrderByUser(userId: number): Promise<Order[]> {
    try {
      const status = 'active';
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId = $1 AND status = $2';
      const result = await conn.query(sql, [userId, status]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  // get order by user
  async getOrderByUser(userId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId = $1';
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  // get order by user and status = completed
  async getOrderCompleteByUser(userId: number): Promise<Order[]> {
    try {
      const status = 'complete';
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId = $1 AND status = $2';
      const result = await conn.query(sql, [userId, status]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  // get order by user and status = active
  async getOrderActiveByUser(userId: number): Promise<Order[]> {
    try {
      const status = 'active';
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE userId = $1 AND status = $2';
      const result = await conn.query(sql, [userId, status]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  // insert order
  async create(order: Order): Promise<Order> {
    try {
      const { productId, userId, quantity, status } = order;
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (productId, userId, quantity, status) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        productId,
        userId,
        quantity,
        status,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert product. Error: ${error}`);
    }
  }
}
