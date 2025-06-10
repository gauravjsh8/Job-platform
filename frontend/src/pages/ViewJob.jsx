import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/utils";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/jobs/getsinglejob/${id}`
        );
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job:", error);
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
    <div className="flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">{job.title}</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location || "Not specified"}
          </p>
          <p>
            <strong>Salary:</strong> {job.salary || "Not mentioned"}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType || "Not mentioned"}
          </p>
        </div>

        <div className="my-6">
          <h3 className="font-semibold text-lg mb-1">Job Description:</h3>
          <p className="text-gray-800 whitespace-pre-line">{job.description}</p>
        </div>

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
          <button
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
            onClick={() => navigate(`/jobs/${job._id}/apply`)}
          >
            Apply Now
          </button>
          <Link
            to="/jobs"
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
