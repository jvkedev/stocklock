import type { Request, Response, NextFunction } from "express";
import z from "zod";

export const validate = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error.issues,
      });
    }

    req.body = result.data;

    next();
  };
};
