import type { UpdateProductFields } from "./product.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import {
  createProduct,
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
