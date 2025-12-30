import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recommendations (
        id SERIAL PRIMARY KEY,
        user_input TEXT NOT NULL,
        recommended_movies JSONB NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Database table initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}


initializeDatabase();

export default pool;