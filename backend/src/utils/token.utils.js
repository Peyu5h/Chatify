import logger from "../configs/logger.js";
import jwt from "jsonwebtoken";

export const sign = (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: expiresIn }, (err, token) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verify = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        logger.error(err);
        resolve(null);
      } else {
        resolve(decoded);
      }
    });
  });
};

export default verify;
