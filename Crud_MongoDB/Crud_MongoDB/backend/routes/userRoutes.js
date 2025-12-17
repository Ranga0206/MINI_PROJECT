import express from "express";
import {
  addUser,
  deleteUser,
  getAllUser,
  getOneUser,
  seeDummyUsers,
  updateUser,
} from "../controllers/user.js";
const router = express.Router();

router.get("/", getAllUser);

router.post("/", addUser);

router.put("/:id", updateUser);

router.get("/:id", getOneUser);

router.delete("/:id", deleteUser);

router.post("/seed-dummy", seeDummyUsers);

export default router;
