import express from "express";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";
import fileRoutes from "./file.routes.js";
import { login } from "../controllers/auth/auth.controller.js";
import { isUserAuthenticated } from "../utils/passport.js";
const router = express.Router();

router.get("/test", (req, res) => res.send("Hello there, It works!"));

router.post("/login", login);

router.use("/user", userRoutes);
router.use("/product", isUserAuthenticated, productRoutes);
router.use("/file", isUserAuthenticated, fileRoutes);

export default router;
