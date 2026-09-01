import { AppError } from "../../shared/errors/AppError.js";
import {
  createProduct,
  findAllProducts,
  findProductById,
} from "./product.repostory.js";

export const listProducts = async () => {
  return await findAllProducts();
};

export const getProductById = async (id: string) => {
  const product = findProductById(id);

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
