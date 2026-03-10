import express from "express";
import mongoose from "mongoose";
import studentsRoutes from "./routes/studentsRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/students", studentsRoutes);
mongoose
  .connect("mongodb://localhost:27017/students_management")
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
