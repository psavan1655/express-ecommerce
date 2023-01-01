import express from "express";
import {
  createUser,
  getAllUsers,
  removeUser,
} from "../controllers/user/user.controller.js";
const router = express.Router();

// router.route("/").get(getAllUsers).post(createUser);

router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:userId", removeUser);

export default router;
