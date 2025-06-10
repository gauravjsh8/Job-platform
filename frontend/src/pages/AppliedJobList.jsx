import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdExpandMore } from "react-icons/md";
import { API_BASE_URL } from "../utils/utils";

const AppliedJobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedApplicants, setExpandedApplicants] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/jobapplicantdetails`);
        setJobs(data.jobs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleApplicant = (jobId, applicantId) => {
    setExpandedApplicants((prev) => {
      const key = `${jobId}-${applicantId}`;
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <div className="loader"></div>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  if (jobs.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>No jobs with applicants found.</div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Jobs & Applicants</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: 16,
            marginBottom: 24,
            backgroundColor: "#fafafa",
          }}
        >
          <h3 style={{ marginBottom: 4 }}>{job.title}</h3>
          <div style={{ color: "#555", marginBottom: 12, fontSize: 14 }}>
            Company: {job.company} | Location: {job.location} | Type:{" "}
            {job.jobType}
          </div>

          {job.applicants.length === 0 ? (
            <div>No applicants yet.</div>
          ) : (
            <div>
              {job.applicants.map((applicant) => {
                const key = `${job._id}-${applicant._id}`;
                const isExpanded = !!expandedApplicants[key];

                return (
                  <div
                    key={applicant._id}
                    style={{
                      borderTop: "1px solid #ddd",
                      paddingTop: 8,
                      paddingBottom: 8,
                    }}
                  >
                    <button
                      onClick={() => toggleApplicant(job._id, applicant._id)}
                      aria-expanded={isExpanded}
                      aria-controls={`applicant-details-${key}`}
                      style={{
                        background: "none",
                        border: "none",
                        width: "100%",
                        textAlign: "left",
                        padding: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#222",
                      }}
                    >
                      <span>
                        {applicant.userId.name} ({applicant.userId.email})
                      </span>
                      <MdExpandMore
                        size={24}
                        style={{
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </button>

                    {isExpanded && (
                      <div
                        id={`applicant-details-${key}`}
                        style={{
                          marginTop: 8,
                          paddingLeft: 12,
                          fontSize: 14,
                          color: "#333",
                        }}
                      >
                        <div>
                          Applied At:{" "}
                          {new Date(applicant.appliedAt).toLocaleString()}
                        </div>
                        <div>
                          Resume:{" "}
                          <a
                            href={applicant.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#1a0dab" }}
                          >
                            View Resume
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppliedJobsList;
