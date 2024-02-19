import express from "express";
import authRoute from "./authRoute.js";
import conversationRoute from "./conversationRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversations", conversationRoute);

export default router;
