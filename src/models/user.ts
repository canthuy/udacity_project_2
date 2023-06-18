import client from '../database';
import bcrypt from 'bcrypt';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {
  // get users
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw Error(`Cannot get users. Error: ${error}`);
    }
  }

  // get user
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw Error(`Cannot get user. Error: ${error}`);
    }
  }

  // insert user
  async create(user: User): Promise<User> {
    try {
      const { firstName, lastName, password } = user;
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(
        password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS ?? '10')
      );
      const result = await conn.query(sql, [firstName, lastName, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot insert user. Error: ${error}`);
    }
  }
}
