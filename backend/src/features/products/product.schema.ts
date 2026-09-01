import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
});
