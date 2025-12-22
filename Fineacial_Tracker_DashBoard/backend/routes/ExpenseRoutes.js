const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
} = require("../Controllers/ExpenseController");

const router = express.Router();

router.route("/").post(addExpense).get(getAllExpense);
router.route("/:id").delete(deleteExpense);

module.exports = router;
