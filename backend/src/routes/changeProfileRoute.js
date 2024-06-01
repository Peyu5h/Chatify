import express from "express";

import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import { changeProfileController } from "../controllers/changeProfileController.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, trimRequest.all, changeProfileController);

export default router;
