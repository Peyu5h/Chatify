import createHttpError from "http-errors";
import UserModel from "../models/UserModel.js";

const findUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("User not found");
  return user;
};

export default findUser;
