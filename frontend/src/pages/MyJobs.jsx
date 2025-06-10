import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { API_BASE_URL } from "../utils/utils";

const MyJobs = () => {
  const { userProfile } = useAuth();
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/jobs/jobappliedbyuser`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setMyJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applied jobs.");
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  if (loading) return <div className="p-4">Loading your jobs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (myJobs.length === 0)
    return <div className="p-4">You haven't applied to any jobs yet.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Jobs You've Applied To</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Job Title</th>
              <th className="py-3 px-4 border-b">Company</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Applied On</th>
              <th className="py-3 px-4 border-b">Resume</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job, index) => {
              const applicant = job.applicants?.find(
                (a) => a.userId === userProfile?._id
              );
              return (
                <tr key={job._id} className="hover:bg-gray-50 text-sm">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b">{job.company}</td>
                  <td className="py-2 px-4 border-b">{job.location}</td>
                  <td className="py-2 px-4 border-b">
                    {applicant.appliedAt
                      ? new Date(applicant.appliedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {applicant.resumeUrl ? (
                      <a
                        href={applicant.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "Not uploaded"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;
