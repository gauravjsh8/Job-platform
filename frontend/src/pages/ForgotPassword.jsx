import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/forgot-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(
        response.data.message || "Check your email for reset link."
      );
      setEmail("");
      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-indigo-600 to-purple-600 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
