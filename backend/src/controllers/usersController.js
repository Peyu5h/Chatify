import createHttpError from "http-errors";
import { searchUsersService } from "../services/userService.js";
export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) throw createHttpError.BadRequest("Search query is required");
    const users = await searchUsersService(keyword, req.user.userid);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
