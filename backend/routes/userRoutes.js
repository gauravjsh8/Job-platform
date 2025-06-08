import express from "express";
import {
  allUsers,
  createUser,
  getAdmins,
  loginUser,
  logoutUser,
  userProfile,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import { authUser, isAdmin } from "../middleware/authMiddleware.js";
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

userRouter.get("/allusers", authUser, isAdmin("admin"), allUsers);

userRouter.get("/admins", authUser, isAdmin("admin"), getAdmins);
