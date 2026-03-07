import express from "express";
import { register, login, logout } from "../controllers/user";
import catchAsync from "../middleware/catchAsync";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/userSchemas";
const router = express.Router();

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(registerSchema), catchAsync(register));
router.post("/login", validate(loginSchema), catchAsync(login));
router.post("/logout", catchAsync(logout));

export default router;
