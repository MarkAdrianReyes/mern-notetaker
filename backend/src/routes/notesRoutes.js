import express from 'express';
import { createNotes, getAllNotes, updateNote, deleteNote, getNoteByID } from '../controllers/notesController.js';

const router = express.Router();

router.post('/', createNotes);
router.get('/', getAllNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

router.get("/:id", getNoteByID);

export default router;