import express from "express";
import trimrRequest from "trim-request";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";

const router = express.Router();
router.route("/register").post(trimrRequest.all, register);
router.route("/login").post(trimrRequest.all, login);
router.route("/logout").post(trimrRequest.all, logout);
router.route("/refreshToken").post(trimrRequest.all, refreshToken);

export default router;
