import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/jobs/getalljobs"
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.log("ERROR", error);
      } finally {
        setLoading(false); // fetch finished
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Posted Jobs</h2>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-300 rounded p-4 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Company:</span> {job.company}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Location:</span>{" "}
                {job.location || "Not specified"}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Salary:</span>{" "}
                {job.salary || "Not mentioned"}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {job.description}
              </p>
              <p className="text-sm text-gray-500 italic">
                Type: {job.jobType || "Not mentioned"}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4 gap-2">
                <p className="text-sm text-gray-500 italic">
                  Posted on:{" "}
                  {new Date(job.createdAt).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/jobs/${job._id}/apply`)}
                    className="px-4 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostedJobs;
