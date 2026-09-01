import { z } from "zod";

export const placeOrderSchema = z.object({
  productId: z.uuid("Invalid product id"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});
