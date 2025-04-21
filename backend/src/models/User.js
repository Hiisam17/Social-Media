const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ username, email, password }) {
    try {
      console.log('Creating user with data:', { username, email });
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');

      const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at
      `;
      const values = [username, email, hashedPassword];
      console.log('Executing query:', query, values);

      const result = await db.query(query, values);
      console.log('Query result:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in User.create:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      console.log('Finding user by email:', email);
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await db.query(query, [email]);
      console.log('Find result:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in User.findByEmail:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      console.log('Finding user by id:', id);
      const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
      const result = await db.query(query, [id]);
      console.log('Find result:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in User.findById:', error);
      throw error;
    }
  }

  static async comparePassword(password, hashedPassword) {
    try {
      console.log('Comparing passwords');
      const result = await bcrypt.compare(password, hashedPassword);
      console.log('Password comparison result:', result);
      return result;
    } catch (error) {
      console.error('Error in User.comparePassword:', error);
      throw error;
    }
  }
}

module.exports = User; 