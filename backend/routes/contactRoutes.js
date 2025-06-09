import express from "express";
import { contactController } from "../controllers/messageController.js";
import { contactMessageValidationSchema } from "../validations/contactSchema.js";
import { validateRequest } from "../middleware/validateMiddleware.js";

export const contactRouter = express.Router();

contactRouter.post(
  "/send-message",
  validateRequest(contactMessageValidationSchema),
  contactController
);
