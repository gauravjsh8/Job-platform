import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import { streamUpload } from "../utils/cloudinaryUpload.js";

export const createJobs = async (req, res) => {
  try {
    const { title, description, company, location, salary, jobType } = req.body;
    const postedBy = req.user.userId;

    if (
      !title ||
      !description ||
      !company ||
      !location ||
      !salary ||
      !jobType
    ) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      postedBy,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { jobType, company, location, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (jobType) filter.jobType = jobType;
    if (company) filter.company = company;
    if (location) filter.location = location;

    const allJobs = await Job.find(filter)
      .populate("postedBy", "name email")
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Job.countDocuments(filter);
    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      jobs: allJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(404).json({ message: "Invalid Job id" });
    }

    const singleJob = await Job.findById(jobId).populate(
      "postedBy",
      "name email"
    );
    if (!singleJob) {
      return res
        .status(404)
        .json({ success: false, message: "No such job found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job found successfully",
      job: singleJob,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Job id" });
    }

    const getJob = await Job.findById(id);
    if (!getJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    if (
      !getJob.postedBy ||
      getJob.postedBy._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await getJob.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      deletedJob: getJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Job id" });
    }
    const userId = req.user.userId.toString();

    const updateData = { ...req.body };

    const findJOb = await Job.findById(id);
    if (!findJOb) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (
      !findJOb.postedBy ||
      findJOb.postedBy._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }
    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const myJob = async (req, res) => {
  try {
    const userId = req.user.userId;

    const getMyJob = await Job.find({ postedBy: userId });

    if (getMyJob.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs posted by this user",
      });
    }

    const total = await Job.countDocuments({ postedBy: userId });

    return res.status(200).json({
      success: true,
      message: "Jobs posted by this user found",
      data: getMyJob,
      total,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job ID." });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume is required." });
    }

    let resumeUrl = "";

    try {
      const result = await streamUpload(req.file.buffer);
      resumeUrl = result.secure_url;
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Resume upload failed." });
    }

    const alreadyApplied = job.applicants.some(
      (app) => app.userId.toString() === userId.toString()
    );

    if (alreadyApplied) {
      return res
        .status(409)
        .json({ success: false, message: "Already applied to this job." });
    }

    job.applicants.push({ userId, resumeUrl });
    await job.save();

    return res
      .status(200)
      .json({ success: true, message: "Applied successfully.", data: job });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
