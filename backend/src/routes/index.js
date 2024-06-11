import express from "express";
import authRoute from "./authRoute.js";
import conversationRoute from "./conversationRoute.js";
import messageRoute from "./messageRoute.js";
import userRoute from "./usersRoute.js";
import changeProfileRoute from "./changeProfileRoute.js";
import updatePeerRoute from "./updatePeerRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversations", conversationRoute);
router.use("/message", messageRoute);
router.use("/user", userRoute);
router.use("/changeProfile", changeProfileRoute);
router.use("/updatePeer", updatePeerRoute);

export default router;
