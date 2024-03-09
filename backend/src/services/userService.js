import createHttpError from "http-errors";
import UserModel from "../models/UserModel.js";

const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("User not found");
  return user;
};

export default findUser;

export const searchUsersService = async (keyword, userId) => {
  const users = await UserModel.find({
    $or: [{ name: { $regex: keyword, $options: "i" } }],
  }).find({
    _id: { $ne: userId },
  });
  return users;
};
