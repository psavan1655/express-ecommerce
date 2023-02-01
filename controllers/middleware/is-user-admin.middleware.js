import chalk from "chalk";
import httpStatus from "http-status";
import { UserRole } from "../../config/constants/roles.constant";

export const isUserAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role !== UserRole.ADMIN) {
      res.error({ message: "Unauthorized Access" }, httpStatus.UNAUTHORIZED);
      return;
    }
    next();
  } catch (error) {
    res.error({ message: error.message }, httpStatus.INTERNAL_SERVER_ERROR);
    console.log(chalk.bgRed(error));
  }
};
