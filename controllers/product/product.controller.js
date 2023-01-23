import chalk from "chalk";
import httpStatus from "http-status";
import mongoose from "mongoose";
import {
  fetchProductById,
  fetchProducts,
  fetchProductsForUser,
  postProduct,
  softDeleteProduct,
} from "./product.service.js";
import { productValidationSchema } from "./product.validator.js";
import { UserRole } from "../../config/constants/roles.constant.js";

export const getAllProducts = async (req, res) => {
  try {
    const productsList = await fetchProducts();

    res.success(productsList, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    console.log(chalk.bgRed(error));
  }
};

export const getProductsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.error(
        { message: "Invalid ID" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (req.user.role === UserRole.USER && !req.user._id.equals(userId)) {
      return res.error({ message: "Not authorized" }, httpStatus.UNAUTHORIZED);
    }

    const productsList = await fetchProductsForUser(userId);

    res.success(productsList, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    console.log(chalk.bgRed(error));
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await fetchProductById(productId);

    if (!product) {
      return res.error(
        { message: "No such product exists" },
        httpStatus.NO_CONTENT
      );
    }

    if (!req.user._id.equals(product.user)) {
      return res.error({ message: "Not authorized" }, httpStatus.UNAUTHORIZED);
    }

    res.success(product, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    console.log(chalk.bgRed(error));
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    // Validate with JOI Schema
    const value = productValidationSchema.validate(productData);

    if (value.error) {
      return res.error(
        { message: value.error.message },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    productData.user = req.user._id;
    // Create product - Service
    const productCreationResponse = await postProduct(productData);

    res.success(productCreationResponse, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.BAD_REQUEST);
    console.log(chalk.red(error));
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.error(
        { message: "Invalid ID" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const product = await fetchProductById(productId);

    if (!product) {
      return res.error(
        { message: "No such product exists" },
        httpStatus.NO_CONTENT
      );
    }

    if (!req.user._id.equals(product.user)) {
      return res.error({ message: "Not authorized" }, httpStatus.UNAUTHORIZED);
    }

    const softDeleteUserResponse = await softDeleteProduct(productId);
    res.success(softDeleteUserResponse, httpStatus.OK);
  } catch (error) {
    console.log(chalk.bgRed(error));
    res.error({ message: error.message }, httpStatus.BAD_REQUEST);
  }
};
