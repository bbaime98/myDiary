import { Pool } from 'pg';
import dotenv from 'dotenv';
import queries from './querries';


dotenv.config();


class DatabaseConfig {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
    });

    this.pool.on('connect', () => {

    });

    this.createTables();
  }

  async createTables() {
    await this.pool.query(queries.users);
  }
}

export default new DatabaseConfig();
