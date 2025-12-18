const db = require("../db");

//create New Notes
const createNote = async (req, res) => {
  try {
    const { note } = req.body;
    const user_id = req.user.id;
    const date = new Date().toISOString().split("T")[0];
    const [result] = await db.query(
      "INSERT INTO notes (user_id,note,date) VALUES(?,?,?)",
      [user_id, note, date]
    );
    res.status(201).json({ message: "Note created", note_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//GetAll Notes By Id

const getAllNotes = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [notes] = await db.query("SELECT * FROM notes WHERE user_id=?", [
      user_id,
    ]);
    if (notes.length === 0) {
      return res.status(404).json({ message: "Notes Is Empety" });
    }
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Update Notes

const updateNotes = async (req, res) => {
  try {
    const { note } = req.body;
    const user_id = req.user.id;
    const note_id = req.params.id;
    const [result] = await db.query(
      "UPDATE notes set note=? WHERE user_id=? and note_id=?",
      [note, user_id, note_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Note not Found" });
    }

    res.status(200).json({ message: "Note Updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//delete Note
const deleteNote = async (req, res) => {
  try {
    const user_id = req.user.id;
    const note_id = req.params.id;
    const [result] = await db.query(
      "DELETE from notes WHERE user_id=? and note_id=?",
      [user_id, note_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Note not Found" });
    }

    res.status(200).json({ message: "Note Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createNote, getAllNotes, updateNotes, deleteNote };
