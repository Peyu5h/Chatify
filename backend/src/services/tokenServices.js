import { sign } from "../utils/token.utils.js";
import jwt from "jsonwebtoken";
import logger from "../configs/logger.js";
import verify from "../utils/token.utils.js";

export const generateToken = async (payload, expiresIn, secret) => {
  let token = await sign(payload, expiresIn, secret);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};
