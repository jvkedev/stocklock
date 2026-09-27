import type { UpdateProductFields } from "./product.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import {
  createProduct,
  deleteProductById,
  findAllProducts,
  findProductById,
  updateProductById,
} from "./product.repository.js";

export const listProducts = async () => {
  return await findAllProducts();
};

export const getProductById = async (id: string) => {
  const product = await findProductById(id);

  if (!product) {
    throw AppError.notFound("Product not found");
  }

  return product;
};

export const addProduct = async (
  name: string,
  description: string | null,
  price: number,
  stock: number,
) => {
  return await createProduct(name, description, price, stock);
};

export const updateProduct = async (
  id: string,
  fields: UpdateProductFields,
) => {
  const updated = await updateProductById(id, fields);

  if (!updated) {
    throw AppError.notFound("Product not found or no valid field to update");
  }

  return updated;
};

export const removeProduct = async (id: string) => {
  try {
    const deleted = await deleteProductById(id);

    if (!deleted) {
      throw AppError.notFound("Product not found");
    }

    return deleted;
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "23503"
    ) {
      throw AppError.conflict(
        "Cannot delete a product that has existing orders",
      );
    }
  }
};
