const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a tittle"],
      trim: true,
      maxlenght: [50, "Title cannot be more than 50 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Please add a positive amount"],
      min: [1, "Amount must be positive"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: ["Food", "Transport", "Utilities", "Entertainment", "Others"],
    },
    date: {
      type: Date,
      required: [true, "Please add a date"],
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
