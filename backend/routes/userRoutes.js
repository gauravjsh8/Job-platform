import express from "express";
import { createUser } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

export const userRouter = express.Router();
userRouter.post("/register", upload.single("photo"), createUser);
