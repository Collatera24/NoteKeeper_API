const pool = require('../config/db');

const createNote = async (userId, title, content) => {
  const result = await pool.query(
    'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, title, content, created_at, updated_at',
    [userId, title, content]
  );
  return result.rows[0];
};

const getNotes = async (userId) => {
  const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
  return result.rows;
};

const getNoteById = async (noteId, userId) => {
  const result = await pool.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [noteId, userId]);
  return result.rows[0];
};

const updateNote = async (noteId, userId, title, content) => {
  const result = await pool.query(
    'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING id, title, content, created_at, updated_at',
    [title, content, noteId, userId]
  );
  return result.rows[0];
};

const deleteNote = async (noteId, userId) => {
  await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [noteId, userId]);
};

module.exports = { createNote, getNotes, getNoteById, updateNote, deleteNote };
