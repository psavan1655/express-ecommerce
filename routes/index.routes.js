import express from "express";
import userRoutes from "./user.routes.js";
import fileRoutes from "./file.routes.js";
import { login } from "../controllers/auth/auth.controller.js";
import { isUserAuthenticated } from "../utils/passport.js";
const router = express.Router();

router.post("/login", login);

router.use("/user", isUserAuthenticated, userRoutes);
router.use("/file", isUserAuthenticated, fileRoutes);

export default router;
