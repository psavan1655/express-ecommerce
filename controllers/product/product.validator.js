import Joi from "joi";

export const userValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
