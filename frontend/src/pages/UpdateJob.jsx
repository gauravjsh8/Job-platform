import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE_URL } from "../utils/utils";

const UpdateJob = () => {
  const jobInfo = {
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
  };

  const [updateJob, setUpdateJob] = useState(jobInfo);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (e) => {
    setUpdateJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/jobs/getsinglejob/${id}`,
          { withCredentials: true }
        );
        console.log(response.data);

        setUpdateJob(response.data.job);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        _id,
        applicants,
        postedBy,
        createdAt,
        updatedAt,
        __v,
        ...dataToSend
      } = updateJob;
      const response = await axios.put(
        `http://localhost:3000/api/jobs/updatejob/${id}`,
        dataToSend,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success(response.data.message);
      setUpdateJob({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
      });

      setTimeout(() => {
        navigate("/dashboard/posted-jobs");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Job</h2>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={updateJob.title}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={updateJob.description}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="company">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={updateJob.company}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={updateJob.location}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="salary">
            Salary
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g., $50,000 - $60,000"
            onChange={handleChange}
            value={updateJob.salary}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="jobType">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleChange}
            value={updateJob.jobType}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
