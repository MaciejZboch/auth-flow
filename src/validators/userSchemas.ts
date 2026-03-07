import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(6).max(20),
  email: Joi.string().required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(6).max(20),
});
