import express from "express";
import {
  createUser,
  getAllUsers,
  removeUser,
} from "../controllers/user/user.controller.js";
import { isUserAuthenticated } from "../utils/passport.js";
const router = express.Router();

router.get("/", isUserAuthenticated, getAllUsers);
router.post("/", createUser);
router.delete("/:userId", isUserAuthenticated, removeUser);

export default router;
