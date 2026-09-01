import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
} from "./product.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { createProductSchema } from "./product.schema.js";

const router = Router();

router.post("/", authenticate, validate(createProductSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
