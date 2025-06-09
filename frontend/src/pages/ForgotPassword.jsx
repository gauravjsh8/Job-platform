import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-indigo-600 to-purple-600 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Forgot Password ?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
