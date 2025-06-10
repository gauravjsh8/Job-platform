import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/utils";

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/jobs/jobapplicantdetails`,
          { withCredentials: true }
        );
        setJobs(data.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="loader mb-2"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No jobs with applicants found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Jobs & Applicants
      </h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          className="border border-gray-300 rounded-md p-4 mb-6 bg-gray-50"
        >
          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
          <p className="text-sm text-gray-700 mb-3">
            <strong>Company:</strong> {job.company} | <strong>Location:</strong>{" "}
            {job.location} | <strong>Type:</strong> {job.jobType}
          </p>

          {job.applicants.length === 0 ? (
            <p className="text-gray-500 italic">No applicants yet.</p>
          ) : (
            <div className="space-y-4">
              {job.applicants.map((applicant) => (
                <div
                  key={applicant._id}
                  className="border-t border-gray-200 pt-2"
                >
                  <p className="font-medium text-gray-800">
                    {applicant.userId?.name} ({applicant.userId?.email})
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Applied At:</strong>{" "}
                    {new Date(applicant.appliedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Resume:</strong>{" "}
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppliedJobsList;
