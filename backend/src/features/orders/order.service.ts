import { AppError } from "../../shared/errors/AppError.js";
import { decrementStock } from "../products/product.repostory.js";
import { getProductById } from "../products/product.service.js";
import { createOrder } from "./order.repository.js";

export const placeOrder = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const product = await getProductById(productId);

  const updatedProduct = await decrementStock(productId, quantity);

  if (!updatedProduct) {
    throw AppError.conflict("Not enough stock available");
  }

  const totalPrice = Number(product.price) * quantity;

  const order = await createOrder(userId, productId, quantity, totalPrice);

  return order;
};
