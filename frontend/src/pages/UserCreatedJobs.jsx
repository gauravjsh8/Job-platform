import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const UserCreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const { userProfile } = useAuth();

  const navigate = useNavigate();

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

  const handleDeleteClick = (jobId) => {
    setJobToDelete(jobId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/jobs/deletejob/${jobToDelete}`,
        {
          withCredentials: true,
        }
      );
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobToDelete));
      setShowModal(false);
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("Failed to delete job");
    }
  };

  const cancelDelete = () => {
    setJobToDelete(null);
    setShowModal(false);
  };

  const handleUpdate = (id) => {
    navigate(`/dashboard/updatejob/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Jobs Created by {userProfile?.name || "Loading..."}
      </h1>

      {jobs.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <div className="text-sm space-y-1 mb-3">
                <p>
                  <span className="font-medium text-gray-800">Company:</span>{" "}
                  {job.company}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Location:</span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Salary:</span> €
                  {job.salary}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Type:</span>{" "}
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {job.jobType}
                  </span>
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleUpdate(job._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDeleteClick(job._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          You haven’t posted any jobs yet.
        </p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl transform transition-all scale-100 w-80">
            <h2 className="text-lg font-semibold text-red-600 mb-3">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-5">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreatedJobs;
