const { Pool } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

console.log('Connecting to database with config:', {
  ...config,
  password: '***' // Ẩn mật khẩu trong log
});

const pool = new Pool(config);

// Test connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(-1);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = {
  query: async (text, params) => {
    const start = Date.now();
    try {
      console.log('Executing query:', text);
      console.log('Query parameters:', params);
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Query executed in', duration, 'ms');
      return result;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  },
}; 