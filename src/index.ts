import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import userRoutes from "./routes/user";
import protectedRoutes from "./routes/protected";

dotenv.config();

const app = express();

//Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Missing MONGO_URI in environment variables");

//Middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, "./views")));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      message: "Too many requests from this IP, please try again later.",
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  next();
});

//MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.log("MongoDB connection error:", err));

//Routes
app.use("/user", userRoutes);
app.use("/protected", protectedRoutes);

//General error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
