import type { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { addProduct, getProductById, listProducts } from "./product.service.js";
import { AppError } from "../../shared/errors/AppError.js";

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    const product = await addProduct(name, description, price, stock);

    res.status(201).json({
      success: true,
      data: product,
    });
  },
);

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await listProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    throw AppError.notFound("Product id is required");
  }

  const product = await getProductById(id);

  res.status(200).json({
    success: true,
    data: product,
  });
});
