import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be at most 200 characters"),

  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters")
    .optional(),

  // coerce converts the string input into a number
  price: z.coerce.number().nonnegative("Price cannot be negative"),

  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .nonnegative("Stock cannot be negative"),
});
export type createProductFormValues = z.infer<typeof createProductSchema>;
