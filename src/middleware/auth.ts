import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "Missing token" });

  //extracting token from header
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
