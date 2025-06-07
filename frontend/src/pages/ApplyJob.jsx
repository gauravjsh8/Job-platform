import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ApplyJob() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/jobs/${id}/applyjob`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Apply for This Job
      </h2>
      <form onSubmit={handleApply} className="flex flex-col space-y-4">
        <label className="text-gray-700 font-medium">
          Upload Your Resume
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            className="mt-2 block w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
        {message && (
          <p className="text-center text-sm text-green-600 font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default ApplyJob;
