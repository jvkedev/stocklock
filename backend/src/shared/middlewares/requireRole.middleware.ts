import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      throw AppError.forbidden(
        "You do not have permission to perform this action",
      );
    }

    next();
  };
};
