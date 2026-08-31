import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/AppError.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { changeUserPassword } from "./user.service.js";

export const changePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw AppError.unauthorized("Authentication required");
    }

    const { currentPassword, newPassword } = req.body;

    await changeUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      data: {
        message: "Password changed successfully",
      },
    });
  },
);
