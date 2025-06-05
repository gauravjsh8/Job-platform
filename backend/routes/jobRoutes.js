import express from "express";

import { authUser } from "../middleware/authMiddleware.js";
import {
  createJobs,
  getAllJobs,
  getSingleJob,
} from "../controllers/jobController.js";

export const jobRouter = express.Router();
jobRouter.post("/create-job", authUser, createJobs);
jobRouter.get("/getalljobs", getAllJobs);
jobRouter.get("/getsinglejob/:id", getSingleJob);
