import { Router } from "express";
import {
  getMe,
  login,
  logout,
  refresh,
  register,
  updateMe,
} from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "./auth.schema.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { authLimiter } from "../../shared/middlewares/rateLimiter.js";
import { changePasswordSchema } from "../users/user.schema.js";
import { changePassword } from "../users/user.controller.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh", refresh);
router.get("/me", authenticate, getMe);
router.post("/logout", logout);
router.patch("/me", authenticate, validate(updateProfileSchema), updateMe);
router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePassword,
);

export default router;
