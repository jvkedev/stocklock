import { Router } from "express";
import { createOrderHandler, getMyOrders } from "./order.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { placeOrderSchema } from "./order.schema.js";

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created
 * /orders/mine:
 *   get:
 *     summary: Get my orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders list
 */
const router = Router();

router.post("/", authenticate, validate(placeOrderSchema), createOrderHandler);
router.get("/mine", authenticate, getMyOrders);

export default router;
