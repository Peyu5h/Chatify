import express from "express";
import authRoute from "./authRoute.js";
import conversationRoute from "./conversationRoute.js";
import messageRoute from "./messageRoute.js";
import userRoute from "./usersRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversations", conversationRoute);
router.use("/message", messageRoute);
router.use("/user", userRoute);

export default router;
