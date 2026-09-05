import { Router } from "express";
import { createOrderHandler } from "./order.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validate.js";
import { placeOrderSchema } from "./order.schema.js";

const router = Router();

router.post("/", authenticate, validate(placeOrderSchema), createOrderHandler);

export default router;
