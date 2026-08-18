import { z } from "zod";

export const registerSchema = z.strictObject({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z.email().max(255, "Email must be at most 255 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});

export const loginSchema = z.strictObject({
  email: z.email().max(255, "Email must be at most 255 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
});
