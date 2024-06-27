const { createNote, getNotes, getNoteById, updateNote, deleteNote } = require('../models/noteModel');

const createNoteHandler = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;
  const note = await createNote(userId, title, content);
  res.status(201).json({ message: 'Note created successfully', noteId: note.id });
};

const getNotesHandler = async (req, res) => {
  const userId = req.user.userId;
  const notes = await getNotes(userId);
  res.json(notes);
};

const getNoteByIdHandler = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user.userId;
  const note = await getNoteById(noteId, userId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
};

const updateNoteHandler = async (req, res) => {
  const { noteId } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;
  const note = await updateNote(noteId, userId, title, content);
  res.json({ message: 'Note updated successfully' });
};

const deleteNoteHandler = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.user.userId;
  await deleteNote(noteId, userId);
  res.json({ message: 'Note deleted successfully' });
};

module.exports = {
  createNoteHandler,
  getNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler,
};
