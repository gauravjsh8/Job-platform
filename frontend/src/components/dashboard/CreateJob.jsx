import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const jobInfo = {
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  };

  const [postJob, setPostJob] = useState(jobInfo);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostJob((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/jobs/create-job",
        postJob,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setPostJob(data.job);
      toast.success(data.message);
      setPostJob({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "Full-time",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="  max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Job</h2>
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
          Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
