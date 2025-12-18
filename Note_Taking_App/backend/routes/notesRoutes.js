const express = require("express");
const auth = require("../middleware/auth");
const {
  createNote,
  getAllNotes,
  updateNotes,
  deleteNote,
} = require("../controllers/notesController");

const router = express.Router();

router.post("/", auth, createNote);
router.get("/", auth, getAllNotes);
router.put("/:id", auth, updateNotes);
router.delete("/:id", auth, deleteNote);

module.exports = router;
