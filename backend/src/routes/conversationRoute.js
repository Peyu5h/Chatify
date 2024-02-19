import express from "express";

import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import { conversationController } from "../controllers/conversationController.js";

const router = express.Router();

router.route("/").post(authMiddleware, trimRequest.all, conversationController);

export default router;
