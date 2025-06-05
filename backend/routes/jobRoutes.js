import express from "express";

import { authUser } from "../middleware/authMiddleware.js";
import {
  createJobs,
  deleteJob,
  getAllJobs,
  getSingleJob,
  myJob,
  updateJob,
} from "../controllers/jobController.js";

export const jobRouter = express.Router();
jobRouter.post("/create-job", authUser, createJobs);
jobRouter.get("/getalljobs", getAllJobs);
jobRouter.get("/getsinglejob/:id", getSingleJob);

jobRouter.delete("/deletejob/:id", authUser, deleteJob);
jobRouter.put("/updatejob/:id", authUser, updateJob);
jobRouter.get("/findmyjob", authUser, myJob);
