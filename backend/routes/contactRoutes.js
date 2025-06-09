import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";
import { contactMessageValidationSchema } from "../validations/contactSchema.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import { authUser, isAdmin } from "../middleware/authMiddleware.js";

export const contactRouter = express.Router();

contactRouter.post(
  "/send-message",
  validateRequest(contactMessageValidationSchema),
  sendMessage
);

contactRouter.get(
  "/get-all-messages",
  authUser,
  isAdmin("admin"),
  getAllMessages
);
