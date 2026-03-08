import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .required()
    .min(3)
    .max(20),
  password: Joi.string().trim().required().min(6).max(20),
  email: Joi.string().trim().email().lowercase().required(),
}).unknown(false);

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().trim().required().min(6).max(20),
}).unknown(false);

export const updateSchema = Joi.object({
  email: Joi.string().trim().email().lowercase().required(),
  username: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .required()
    .min(3)
    .max(20),
}).unknown(false);
