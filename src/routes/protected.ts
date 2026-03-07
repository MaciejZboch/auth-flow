import express from "express";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { updateSchema } from "../validators/userSchemas";
import catchAsync from "../middleware/catchAsync";
import { edit, list, profile } from "../controllers/protected";

const router = express.Router();

/**
 * @openapi
 * /protected/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns username and email of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized (no valid token)
 */
router.get("/profile", authenticate, catchAsync(profile));

/**
 * @openapi
 * /protected/list:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of user objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       email:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/list", authenticate, catchAsync(list));

/**
 * @openapi
 * /protected/edit:
 *   put:
 *     summary: Edit the authenticated user's profile (username and email)
 *     tags:
 *       - Protected
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username (3-20 characters)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email
 *     responses:
 *       200:
 *         description: Profile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Username and email are required
 *       401:
 *         description: Unauthorized (no valid token)
 */
router.put("/edit", authenticate, validate(updateSchema), catchAsync(edit));

export default router;
