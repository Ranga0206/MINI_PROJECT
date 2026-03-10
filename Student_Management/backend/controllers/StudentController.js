import { json } from "express";
import Student from "../models/Student.js";

const calculateResult = (marks) => {
  const markValues = Object.values(marks);
  const total = markValues.reduce((acc, curr) => acc + curr, 0);
  const percentage = total / 5;
  const passedAllSubjects = markValues.every((mark) => mark >= 35);
  let grade = "Fail";
  let status = "Fail";
  if (passedAllSubjects) {
    status = "Pass";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 75) grade = "A";
    else if (percentage >= 50) grade = "B";
    else grade = "C";
  }
  return { total, percentage, grade, status };
};

//create new Student
export const createStudent = async (req, res) => {
  const results = calculateResult(req.body.marks);
  const student = new Student({ ...req.body, ...results });
  await student.save();
  res.status(201).json(student);
};

//getAll by limit students
export const getStudents = async (req, res) => {
  const { page = 1, limit = 5, status, search = "" } = req.query;
  let query = { name: { $regex: search, $options: "i" } };
  if (status) query.status = status;
  const results = await Student.find(query)
    .limit(limit)
    .skip((page - 1) * limit);
  const count = await Student.countDocuments(query);
  //   console.log("TotalCount", count);
  res.status(200).json({ results, totalPages: Math.ceil(count / limit) });
};

//getAll Students
export const getAllStudents = async (req, res) => {
  const { status } = req.query;
  let query = {};
  if (status) query.status = status;
  const results = await Student.find(query);
  //   console.log("TotalCount", count);
  res.status(200).json({ results });
};

//Update Student
export const updateStudent = async (req, res) => {
  const results = calculateResult(req.body.marks);
  const id = req.params.id;
  const student = await Student.findByIdAndUpdate(
    id,
    { ...req.body, ...results },
    { new: true },
  );
  res.status(200).json({ student });
};

//Delete Students
export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  await Student.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted" });
};

//Find By Id
export const findById = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  res.status(200).json(student);
};
