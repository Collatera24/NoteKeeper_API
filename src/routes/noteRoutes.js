const express = require('express');
const {
  createNoteHandler,
  getNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler,
} = require('../controllers/noteController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/notes', authenticateToken, createNoteHandler);
router.get('/notes', authenticateToken, getNotesHandler);
router.get('/notes/:noteId', authenticateToken, getNoteByIdHandler);
router.put('/notes/:noteId', authenticateToken, updateNoteHandler);
router.delete('/notes/:noteId', authenticateToken, deleteNoteHandler);

module.exports = router;
