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
 *     description: Creates a new user account with a hashed password.
 *     tags:
 *       - User
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
 *                 format: email
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created
 *                 userId:
 *                   type: string
 *                   example: 65fa1e2a9c3f9b00123abcde
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/register", validate(registerSchema), catchAsync(register));
/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a short-lived access token. A refresh token is issued as an HTTP-only cookie.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only refresh token cookie
 *             schema:
 *               type: string
 *               example: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Short-lived JWT access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", validate(loginSchema), catchAsync(login));
/**
 * @openapi
 * /user/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user by deleting the refresh token stored in the HTTP-only cookie and removing it from the database.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out
 *       401:
 *         description: Refresh token missing
 *       500:
 *         description: Server error
 */
router.post("/logout", catchAsync(logout));

export default router;
