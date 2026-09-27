import { Router } from "express";
import {
  createProduct,
  deleteProductHandler,
  getProduct,
  getProducts,
  updateProductHandler,
} from "./product.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
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
router.patch(
  "/:id",
  authenticate,
  requireRole("admin"),
  validate(updateProductSchema),
  updateProductHandler,
);
router.delete("/:id", authenticate, requireRole("admin"), deleteProductHandler);

export default router;
