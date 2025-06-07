import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/jobs/getsinglejob/${id}`
        );
        setJob(response.data.job);
      } catch (error) {
        console.log("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-center">Loading job details...</p>;
  }

  if (!job) {
    return <p className="p-6 text-center text-red-600">Job not found.</p>;
  }

  return (
    <div className="  flex items-center justify-center mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 border w-lg border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">{job.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {job.location || "Not specified"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Salary:</strong> {job.salary || "Not mentioned"}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Job Type:</strong> {job.jobType || "Not mentioned"}
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Description:</strong> <br /> {job.description}
        </p>
        <p className="text-sm text-gray-500 italic mb-6">
          Posted on:{" "}
          {new Date(job.createdAt).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: false,
          })}
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Apply Now
          </button>
          <Link
            to="/jobs"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
