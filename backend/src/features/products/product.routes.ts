import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
} from "./product.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { createProductSchema } from "./product.schema.js";
import { requireRole } from "../../shared/middlewares/requireRole.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  requireRole("admin"),
  validate(createProductSchema),
  createProduct,
);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
