import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import { authUser } from "../middleware/authMiddleware.js";

export const userRouter = express.Router();
userRouter.post("/register", upload.single("photo"), createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authUser, logoutUser);
