import { Request, Response, NextFunction } from "express";

export const hasNoSpecialSymbols = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allowedCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@. ";

  for (const key in req.body) {
    const s = req.body[key]; // Get the value of each field

    if (typeof s !== "string") continue; // Skip non-string values

    for (let char of s) {
      if (!allowedCharacters.includes(char)) {
        return res.status(400).json({
          error: "Special characters not allowed. Use only letters/numbers.",
        });
      }
    }
  }

  next();
};
