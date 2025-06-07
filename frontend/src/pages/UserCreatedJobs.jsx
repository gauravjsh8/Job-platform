import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const UserCreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { userProfile } = useAuth();

  useEffect(() => {
    const jobByUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/jobs/jobbyuser`,
          { withCredentials: true }
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (userProfile) jobByUser();
  }, [userProfile]);

  return (
    <div className="max-w-4xl mx-auto mt-1 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Jobs Created by {userProfile?.name || "Loading..."}
      </h1>

      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 hover:bg-blue-100 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-indigo-600">
                {job.title}
              </h2>
              <p className="text-gray-600 mt-1">{job.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span className="block">
                  <strong>Company:</strong> {job.company}
                </span>
                <span className="block">
                  <strong>Location:</strong> {job.location}
                </span>
                <span className="block">
                  <strong>Salary:</strong> {job.salary}
                </span>
                <span className="block">
                  <strong>Type:</strong> {job.jobType}
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleUpdate(job._id)}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You haven’t posted any jobs yet.</p>
      )}
    </div>
  );
};

export default UserCreatedJobs;
