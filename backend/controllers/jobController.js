import Job from "../models/jobModel.js";

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
