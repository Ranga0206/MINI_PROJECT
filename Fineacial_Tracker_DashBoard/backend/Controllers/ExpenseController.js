const db = require("../models/Expense");

//deleteExpense

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    const expense = await db.findById(id);
    if (!expense) {
      return res
        .status(404)
        .json({ message: false, error: "Expense Not Found" });
    }
    await db.deleteOne(expense);

    return res
      .status(200)
      .json({ success: true, message: "Expense Deleted SuccessFully !" });
  } catch (err) {
    console.error(`Error ${err.message}`);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

//get all expenses
exports.getAllExpense = async (req, res) => {
  try {
    const expense = await db.find().sort({ date: -1 });
    if (expense.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Expense Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, count: expense.length, data: expense });
  } catch (err) {
    console.error(`Error ${err.message}`);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

//Add new expenses
exports.addExpense = async (req, res) => {
  try {
    const expense = await db.create(req.body);
    return res.status(201).json({ success: true, data: expense });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      return res.status(500).json({ success: false, error: message });
    }
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
