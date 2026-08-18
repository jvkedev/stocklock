import { Router } from "express";
import { getMe, login, refresh, register } from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);

export default router;
