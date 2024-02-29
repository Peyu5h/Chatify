import express from "express";

import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  conversationController,
  getConversationsController,
} from "../controllers/conversationController.js";

const router = express.Router();

router.route("/").post(authMiddleware, trimRequest.all, conversationController);
router
  .route("/")
  .get(authMiddleware, trimRequest.all, getConversationsController);

export default router;
