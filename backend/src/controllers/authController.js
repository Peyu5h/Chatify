import createHttpError from "http-errors";
import { createUser, signUser } from "../services/authService.js";
import { generateToken, verifyToken } from "../services/tokenServices.js";
import findUser from "../services/userService.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    const expiresInAccessToken = 24 * 60 * 60; // 1 day
    const expiresInRefreshToken = 30 * 24 * 60 * 60; // 30 days

    const access_token = await generateToken(
      { userid: newUser._id },
      expiresInAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const refreshToken = await generateToken(
      { userid: newUser._id },
      expiresInRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth",
      maxAge: expiresInRefreshToken * 1000,
    });

    res.json({
      message: "User created successfully",

      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser({ email, password });

    const expiresInAccessToken = 24 * 60 * 60; // 1 day
    const expiresInRefreshToken = 30 * 24 * 60 * 60; // 30 days

    const access_token = await generateToken(
      { userid: user._id },
      expiresInAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const refreshToken = await generateToken(
      { userid: user._id },
      expiresInRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/v1/auth",
      maxAge: expiresInRefreshToken * 1000,
    });

    res.json({
      message: "Logged in successfully",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", { path: "/api/v1/auth" });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized("Please login first");
    }
    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await findUser(check.userid);
    const access_token = await generateToken(
      { userid: user._id },
      24 * 60 * 60,
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
