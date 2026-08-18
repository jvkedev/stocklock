import { Router } from "express";
import { login, refresh, register } from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);

export default router;
