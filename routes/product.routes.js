import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByUser,
  removeProduct,
} from "../controllers/product/product.controller.js";
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.get("/user/:userId", getProductsByUser);
router.post("/", createProduct);
router.delete("/:productId", removeProduct);

export default router;
