import Joi from "joi";

export const contactMessageValidationSchema = Joi.object({
  fullname: Joi.string().trim().required().min(2),
  email: Joi.string().trim().required().min(2),
  phoneNumber: Joi.string().trim().required(),
  message: Joi.string().trim().required(),
});
