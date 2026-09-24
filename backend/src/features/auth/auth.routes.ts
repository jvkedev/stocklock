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

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User created
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful login
 * /auth/refresh:
 *   post:
 *     summary: Refresh session token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Tokens refreshed
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 * /auth/change-password:
 *   patch:
 *     summary: Change current user password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated
 */
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
