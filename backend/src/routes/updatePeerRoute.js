import express from "express";

import trimRequest from "trim-request";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPeerController,
  setPeerController,
} from "../controllers/updatePeerController.js";

const router = express.Router();

router
  .route("/get/:userId")
  .get(authMiddleware, trimRequest.all, getPeerController);
router.route("/set").post(authMiddleware, trimRequest.all, setPeerController);

export default router;
