import chalk from "chalk";
import { loginValidationSchema } from "./auth.validator.js";
import { loginService } from "./auth.service.js";
import httpStatus from "http-status";

export const login = async (req, res) => {
  try {
    const loginPayload = req.body;

    // Validate with JOI Schema
    const value = loginValidationSchema.validate(loginPayload);

    if (value.error) {
      return res.error(
        { message: value.error.message },
        httpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const loggedInUserData = await loginService(loginPayload);

    res.success(loggedInUserData, httpStatus.OK);
  } catch (error) {
    console.log(chalk.bgRed(error));
    res.error({ message: error.message }, httpStatus.BAD_REQUEST);
  }
};
