import { Router } from "express";
import { getMe, login, logout, refresh, register } from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { authLimiter } from "../../shared/middlewares/rateLimiter.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);
router.post("/logout", logout);

export default router;
