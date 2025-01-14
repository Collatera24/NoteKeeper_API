const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
    [username, hashedPassword]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

module.exports = { createUser, findUserByUsername };
