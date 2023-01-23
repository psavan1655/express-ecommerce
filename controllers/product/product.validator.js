import Joi from "joi";

export const productValidationSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(1000),
  image: Joi.string(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(0),
});
