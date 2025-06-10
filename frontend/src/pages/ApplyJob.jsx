import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/utils";

function ApplyJob() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please upload your resume.");
      toast.error("Please upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/jobs/${id}/applyjob`,
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
      const errorMsg = error.response?.data?.message || "Something went wrong";
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl border border-blue-200">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Apply for This Job
        </h2>
        <form
          onSubmit={handleApply}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Your Resume
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              accept=".pdf,.doc,.docx"
              className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>

          {message && (
            <p
              className={`text-center text-sm font-medium ${
                message.toLowerCase().includes("success") ||
                message.toLowerCase().includes("applied")
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;
