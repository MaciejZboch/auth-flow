import express from "express";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: "Protected profile route" });
});

router.get("/dashboard", authenticate, (req, res) => {
  res.json({ message: "Protected dashboard route" });
});

router.get("/settings", authenticate, (req, res) => {
  res.json({ message: "Protected settings route" });
});

export default router;
