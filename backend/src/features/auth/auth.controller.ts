import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import {
  currentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "./auth.service.js";
import { AppError } from "../../shared/errors/AppError.js";
import { success } from "zod";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  res.status(201).json({
    success: true,
    data: user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.cookie("refreshToken", result.tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      user: result.user,
      accessToken: result.tokens.accessToken,
    },
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw AppError.unauthorized("Refresh token is required");
  }

  const result = await refreshAccessToken(refreshToken);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: {
      accessToken: result.accessToken,
    },
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw AppError.notFound("Authentication required");
  }

  const user = await currentUser(userId);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  await logoutUser(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    data: {
      message: "Logged out successfully",
    },
  });
});
