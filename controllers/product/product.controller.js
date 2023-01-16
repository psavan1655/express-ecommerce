import chalk from "chalk";
import { userValidationSchema } from "./user.validator.js";
import httpStatus from "http-status";
import { fetchUsers, postUser, softDeleteUser } from "./user.service.js";
import { UserRole } from "../../config/constants/roles.constant.js";
import mongoose from "mongoose";

export const getAllProducts = async (req, res) => {
  try {
    const productsList = await fetchUsers();

    res.success(productsList, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    console.log(chalk.bgRed(error));
  }
};

export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    // Validate with JOI Schema
    const value = userValidationSchema.validate(userData);

    if (value.error) {
      return res.error(
        { message: value.error.message },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    // Create user - Service
    const userCreationResponse = await postUser(userData);

    res.success(userCreationResponse, httpStatus.OK);
  } catch (error) {
    res.error({ message: error.message }, httpStatus.BAD_REQUEST);
    console.log(chalk.red(error));
  }
};

export const removeUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.error(
        { message: "Invalid ID" },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (req.user.role === UserRole.USER && req.user._id !== userId) {
      return res.error({ message: "Not authorized" }, httpStatus.UNAUTHORIZED);
    }

    const softDeleteUserResponse = await softDeleteUser(userId);
    res.success(softDeleteUserResponse, httpStatus.OK);
  } catch (error) {
    console.log(chalk.bgRed(error));
    res.error({ message: error.message }, httpStatus.BAD_REQUEST);
  }
};
