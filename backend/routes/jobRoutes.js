import express from "express";

import { authUser } from "../middleware/authMiddleware.js";
import {
  applyJob,
  createJobs,
  deleteJob,
  getAllJobs,
  getSingleJob,
  jobAppliedByUser,
  myJob,
  updateJob,
  userCreatedJob,
} from "../controllers/jobController.js";
import upload from "../middleware/multer.js";
import {
  jobUpdateValidationSchema,
  jobValidationSchema,
} from "../validations/jobSchema.js";
import { validateRequest } from "../middleware/validateMiddleware.js";

export const jobRouter = express.Router();
jobRouter.post(
  "/create-job",
  authUser,
  validateRequest(jobValidationSchema),
  createJobs
);
jobRouter.get("/getalljobs", getAllJobs);
jobRouter.get("/getsinglejob/:id", getSingleJob);

jobRouter.delete("/deletejob/:id", authUser, deleteJob);
jobRouter.put(
  "/updatejob/:id",
  authUser,
  validateRequest(jobUpdateValidationSchema),
  updateJob
);
jobRouter.get("/findmyjob", authUser, myJob);

jobRouter.post("/:id/applyjob", authUser, upload.single("resume"), applyJob);

jobRouter.get("/jobbyuser", authUser, userCreatedJob);
jobRouter.get("/jobappliedbyuser", authUser, jobAppliedByUser);
