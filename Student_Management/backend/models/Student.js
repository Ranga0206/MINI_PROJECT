import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },
  marks: { m1: Number, m2: Number, m3: Number, m4: Number, m5: Number },
  total: Number,
  percentage: Number,
  grade: String,
  status: String,
});

export default mongoose.model("Student", studentSchema);
