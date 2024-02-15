import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

//ENV variables
const { DEFAULT_PICTURE } = process.env;
const { DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please provide all required fields");
  }

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    throw createHttpError.BadRequest(
      "Name must be between 2 and 30 characters"
    );
  }

  if (status && status.length > 100) {
    throw createHttpError.BadRequest(
      "Status must be maximum 100 characters long"
    );
  }

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please provide a valid email");
  }

  const checkDB = await UserModel.findOne({ email });
  if (checkDB) {
    throw createHttpError.Conflict(`Email is already registered`);
  }

  if (!validator.isLength(password, { min: 6, max: 64 })) {
    throw createHttpError.BadRequest(
      "Password must be at least 6 characters long"
    );
  }

  const newUser = await UserModel({
    name,
    email,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();

  return newUser;
};

export const signUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw createHttpError.NotFound("User not found");
  }

  let passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createHttpError.Unauthorized("Invalid credentials");
  }

  return user;
};
