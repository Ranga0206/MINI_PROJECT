const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MYSQL CRUD API RUNNING !");
});

//Get All Users
app.get("/api/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Add User
app.post("/api/users", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({ error: "Name,Email and Age are Required !" });
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name Must Be at least 2 characters!" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invaild Email Id!" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO users (name,email,age) values(?,?,?)`,
      [name, email, age]
    );
    // console.log(result);
    res.status(201).json({ id: result.insertId, name, email, age });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email Address Already Exits!" });
    }
    return res.status(500).json({ error: err.message });
  }
});

//Update User
app.put("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid User Id !" });
  }

  const { name, email, age } = req.body;
  try {
    const [result] = await db.query(
      `update users SET name=?,email=?,age=? where id=?`,
      [name, email, age, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User Not Found" });
    return res.json({ id, name, email, age });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//User Get By Id
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid User Id !" });
  }
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length == 0)
      return res.status(404).json({ error: "User Not Found" });
    return res.json(rows[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});

//Delete By Id

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid User Id !" });
  }

  try {
    const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
    //console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User Not Found" });
    return res.json({ message: "User Deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.use((req, res) => {
  return res.status(404).json({ error: "404 Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
