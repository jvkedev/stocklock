import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../../features/auth/auth.token.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw AppError.unauthorized("Authorization required");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw AppError.unauthorized("Token required");
  }

  try {
    const decoded = verifyAccessToken(token);

    req.user = {
      id: decoded.sub,
    };

    next();
  } catch (error) {
    throw AppError.unauthorized("Invalid or expired token");
  }
};
