import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaMoneyBillAlt, FaBuilding } from "react-icons/fa";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">
          Posted Jobs
        </h2>
        <p className="text-center text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">
        Available Job Listings
      </h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No jobs available right now.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl border border-gray-200 transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaBuilding className="text-blue-500" />
                {job.company}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaMapMarkerAlt className="text-green-500" />
                {job.location || "Not specified"}
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <FaMoneyBillAlt className="text-yellow-500" />
                {job.salary || "Not mentioned"}
              </div>
              <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                {job.description}
              </p>
              <p className="text-xs text-gray-500 italic mb-4">
                Type: {job.jobType || "Not mentioned"}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Posted on:{" "}
                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/jobs/${job._id}/apply`)}
                    className="px-4 py-1 rounded bg-green-600 hover:bg-green-700 text-white"
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
