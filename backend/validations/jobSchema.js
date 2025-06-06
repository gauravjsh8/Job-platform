import Joi from "joi";

export const jobValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(10).required(),
  company: Joi.string().trim().required(),
  location: Joi.string().trim().allow("").optional(),
  salary: Joi.string().allow("").optional(),

  jobType: Joi.string()
    .valid("Full-time", "Part-time", "Internship", "Remote")
    .default("Full-time"),

  applicants: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().hex().length(24).required(),
        resumeUrl: Joi.string().uri().required(),
        appliedAt: Joi.date().optional(),
      })
    )
    .optional(),
});

export const jobUpdateValidationSchema = Joi.object({
  title: Joi.string().trim().min(3).optional(),
  description: Joi.string().trim().min(10).optional(),
  company: Joi.string().trim().optional(),
  location: Joi.string().trim().allow("").optional(),
  salary: Joi.string().allow("").optional(),

  jobType: Joi.string()
    .valid("Full-time", "Part-time", "Internship", "Remote")
    .optional(),

  applicants: Joi.array()
    .items(
      Joi.object({
        userId: Joi.string().hex().length(24).required(),
        resumeUrl: Joi.string().uri().required(),
        appliedAt: Joi.date().optional(),
      })
    )
    .optional(),
});
