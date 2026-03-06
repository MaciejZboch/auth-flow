import express from "express";
import { register } from "../controllers/user";
import catchAsync from "../middleware/catchAsync";
import { validate } from "../middleware/validate";
import { registerSchema } from "../validators/userSchemas";
const router = express.Router();

//router.get("/", index);
router.post("/register", validate(registerSchema), catchAsync(register));

export default router;
