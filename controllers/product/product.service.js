import chalk from "chalk";
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import mongoose from "mongoose";

/**
 * @param(productId: number)
 * @returns product object
 */
export const fetchProductById = async (productId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid ID");
    }

    return Product.findOne({ _id: productId, isDeleted: false });
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @returns list of all active products[]
 */
export const fetchProducts = async () => {
  try {
    const productsList = await Product.find({ isDeleted: false });
    return productsList;
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(userId: number)
 * @returns list of all active products for userId[]
 */
export const fetchProductsForUser = async (userId) => {
  try {
    const productsList = await Product.find({ user: userId, isDeleted: false });
    return productsList;
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(product: Product Object)
 * @returns "OK"
 */
export const postProduct = async (productPayload) => {
  try {
    await Product.create(productPayload);
    return { message: "OK" };
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(productId: number)
 * @returns "OK"
 */
export const softDeleteProduct = async (productId) => {
  try {
    await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { isDeleted: true } }
    );

    return { message: "OK" };
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};
