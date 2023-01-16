import mongoose, { mongo } from "mongoose";
import { UserRole } from "../config/constants/roles.constant.js";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
      minValue: 0,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", ProductSchema);
export default Product;
