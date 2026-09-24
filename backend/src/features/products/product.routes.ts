import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProductHandler,
} from "./product.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import { requireRole } from "../../shared/middlewares/requireRole.middleware.js";

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Product created
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products list
 * /products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated
 */
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

export default router;
