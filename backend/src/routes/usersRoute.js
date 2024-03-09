import express from "express";
import trimrRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import { searchUsers } from "../controllers/usersController.js";

const router = express.Router();
router.route("/").get(trimrRequest.all, authMiddleware, searchUsers);

export default router;
