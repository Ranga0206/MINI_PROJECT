const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//Load enviroment variables from .env file
dotenv.config({ path: "./config/.env" });

//mongoose Connections
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MOngoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error :${error.message}`);
    process.exit(1);
  }
};
connectDB();

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
const expenseRoute = require("./routes/ExpenseRoutes");
app.use("/api/v1/expenses", expenseRoute);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Working..." });
});

app.listen(PORT, console.log(`Server Runing http://localhost:${PORT}`));
