import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

export const userRouter = express.Router();
userRouter.post("/register", upload.single("photo"), createUser);
userRouter.post("/login", loginUser);
