import { Router } from "express";
import { createOrderHandler, getMyOrders } from "./order.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { placeOrderSchema } from "./order.schema.js";

const router = Router();

router.post("/", authenticate, validate(placeOrderSchema), createOrderHandler);
router.get("/mine", authenticate, getMyOrders);

export default router;
