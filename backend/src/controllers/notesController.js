import Note from '../model/Notes.js';
import mongoose from 'mongoose';

export async function createNotes (req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error in createNotes controller:', error);
    res.status(500).json({ message: 'Error creating note' });
  }
}

export async function getAllNotes (_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);

  } catch (error) {
    console.error('Error in getAllNotes controller:', error);
    res.status(500).json({ message: 'Error fetching notes'});
  }
}

export async function updateNote (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id, 
      { title, content }, 
      { new: true, }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(updatedNote);

  } catch (error) {
    console.error('Error in updateNote controller:', error);
    res.status(500).json({ message: 'Error updating note' });
  }
}

export async function deleteNote (req, res) {
  try {
    const noteId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(noteId)) return res.status(400).json({ message: 'Invalid note ID' });

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully' });
 
  } catch (error) {
    console.error('Error in deleteNote controller:', error);
    res.status(500).json({ message: 'Error deleting note' });
  }
}

export async function getNoteByID (req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    console.error('Error in getNoteByID controller:', error);
    res.status(500).json({ message: 'Error fetching note' });
  }
}