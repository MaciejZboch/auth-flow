import express from "express";
import { register } from "../controllers/user";
import catchAsync from "../middleware/catchAsync";
const router = express.Router();

//router.get("/", index);
router.post("/register", catchAsync(register));

export default router;
