import chalk from "chalk";
import { fetchUserByEmail } from "../user/user.service.js";

export const loginService = async (loginPayload) => {
  try {
    const user = await fetchUserByEmail(loginPayload.email);
    if (!user) {
      throw Error("User does not exist");
    }

    if (!user.isPasswordValid(loginPayload.password)) {
      throw Error("Invalid password");
    }

    return user.toAuthJSON();
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};
