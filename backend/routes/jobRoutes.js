import express from "express";

import { authUser } from "../middleware/authMiddleware.js";
import { createJobs } from "../controllers/jobController.js";

export const jobRouter = express.Router();
jobRouter.post("/create-job", authUser, createJobs);
