import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

import userRoutes from "./routes/user";
import protectedRoutes from "./routes/protected";

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, "./views")));

//Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Missing MONGO_URI in environment variables");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.log("MongoDB connection error:", err));

//Routes
app.use("/user", userRoutes);
app.use("/protected", protectedRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
