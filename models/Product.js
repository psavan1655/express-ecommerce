import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
      minValue: 1,
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
