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
      console.log('database connected...');
    });

    this.createTables();
  }

  async createTables() {
    try {
      await this.pool.query(queries.users);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new DatabaseConfig();
