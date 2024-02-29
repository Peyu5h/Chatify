import express from "express";
import authRoute from "./authRoute.js";
import conversationRoute from "./conversationRoute.js";
import messageRoute from "./messageRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversations", conversationRoute);
router.use("/message", messageRoute);

export default router;
