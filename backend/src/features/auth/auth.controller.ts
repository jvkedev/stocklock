import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { loginUser, refreshAccessToken, registerUser } from "./auth.service.js";
import { AppError } from "../../shared/errors/AppError.js";

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

  const user = await loginUser(email, password);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw AppError.unauthorized("Refresh token is required");
  }

  const tokens = await refreshAccessToken(refreshToken);

  res.status(200).json({
    success: true,
    data: tokens,
  });
});
