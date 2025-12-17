import express, { json } from "express";
import dotenv from "dotenv";
import ConnectDB from "./db.js";
import router from "./routes/userRoutes.js";
import cors from "cors";
dotenv.config();

ConnectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is Runing in http://localhost:${PORT}`)
);
