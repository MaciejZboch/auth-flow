import express from "express";
import { register, login, logout } from "../controllers/user";
import catchAsync from "../middleware/catchAsync";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validators/userSchemas";
const router = express.Router();

//router.get("/", index);
router.post("/register", validate(registerSchema), catchAsync(register));
router.post("/login", validate(loginSchema), catchAsync(login));
router.post("/logout", catchAsync(logout));

export default router;
