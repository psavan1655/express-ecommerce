import chalk from "chalk";
import User from "../../models/User.js";

/**
 * @param(userId: number)
 * @returns user object
 */
export const fetchUserById = async (userId) => {
  try {
    return User.findOne({ _id: userId, isDeleted: false });
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(email: string)
 * @returns user object
 */
export const fetchUserByEmail = async (userEmail) => {
  try {
    return User.findOne({ email: userEmail, isDeleted: false });
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @returns list of all active users[]
 */
export const fetchUsers = async () => {
  try {
    const usersList = await User.find({ isDeleted: false });
    return usersList.map((user) => user.parseUser());
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(user: User Object)
 * @returns "OK"
 */
export const postUser = async (userPayload) => {
  try {
    const existingUser = await User.findOne({ email: userPayload.email });

    if (existingUser) {
      throw Error("User already exists");
    }

    await User.create(userPayload);
    return { message: "OK" };
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};

/**
 * @param(userId: number)
 * @returns "OK"
 */
export const softDeleteUser = async (userId) => {
  try {
    const existingUser = await fetchUserById(userId);

    if (!existingUser) {
      throw Error(`No such user exists`);
    }

    existingUser.isDeleted = true;

    await User.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } });

    return { message: "OK" };
  } catch (error) {
    console.log(chalk.bgRed(error));
    throw error;
  }
};
