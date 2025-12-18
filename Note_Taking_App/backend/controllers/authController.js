const db = require("../db");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register New User
const register = async (req, res) => {
  try {
    const { username, email, contact, password } = req.body;
    const profile_image = req.file ? `/uploads/${req.file.filename}` : null;
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Username,email and Password are required " });
    }
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username=? or email=?",
      [username, email]
    );
    //Check user is already exists by username or Email
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or Email id already exists" });
    }
    //Password Hashing
    const hashedPassword = await bcryptjs.hash(password, 10);

    //Store user data to db

    const sql =
      "INSERT INTO users (username,email,contact,password,profile_image) VALUES(?,?,?,?,?)";

    await db.query(sql, [
      username,
      email,
      contact || null,
      hashedPassword,
      profile_image,
    ]);
    res.status(201).json({ message: "User Registered SuccessFully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await db.query(
      "SELECT * FROM users where username=? or email=?",
      [username, username]
    );
    //check User Avaliable
    if (users.length === 0) {
      res.status(400).json({ message: "Invaild User Details" });
    }
    const user = users[0];
    //Password Match
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invaild Username or password" });
    }
    const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
    });

    res.status(200).json({ message: "Login Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//Get Current Login User
const getCurrentUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [users] = await db.query(
      "SELECT id,username,email,contact,profile_image from users WHERE id=?",
      [user_id]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(users[0]);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//logout

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//update Current Profile Image

const uploadProfileImage = async (req, res) => {
  try {
    const user_id = req.user.id;
    const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await db.query(
      "UPDATE users SET profile_image=? WHERE id=?",
      [profile_image, user_id]
    );
    // console.log(result);
    res.json({ message: "Profile image uploaded", profile_image });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  uploadProfileImage,
  logout,
};
