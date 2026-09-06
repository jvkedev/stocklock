import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { AppError } from "../../shared/errors/AppError.js";
import { getOrdersForUser, placeOrder } from "./order.service.js";

export const createOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw AppError.unauthorized("Authorization required");
    }

    const { productId, quantity } = req.body;

    const order = await placeOrder(userId, productId, quantity);

    res.status(201).json({
      success: true,
      data: order,
    });
  },
);

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw AppError.unauthorized("Authorization required");
  }

  const orders = await getOrdersForUser(userId);

  res.status(200).json({
    success: true,
    data: orders,
  });
});
