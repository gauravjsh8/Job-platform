import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  userProfile,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import { authUser } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateMiddleware.js";
import {
  loginUserValidationSchema,
  registerUserValidationSchema,
} from "../validations/userSchema.js";

export const userRouter = express.Router();
userRouter.post(
  "/register",
  upload.single("photo"),
  validateRequest(registerUserValidationSchema),
  createUser
);
userRouter.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  loginUser
);
userRouter.post("/logout", authUser, logoutUser);
userRouter.get("/user-profile", authUser, userProfile);
