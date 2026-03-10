import {
  createStudent,
  deleteStudent,
  findById,
  getAllStudents,
  getStudents,
  updateStudent,
} from "../controllers/StudentController.js";
import express from "express";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/all", getAllStudents);
router.get("/:id", findById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
