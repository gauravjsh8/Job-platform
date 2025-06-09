// pages/ResetPasswordPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/reset-password/${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Password reset successful");
      navigate("/login");
      setPassword("");
      setConfirmPassword("");

      console.log("RESPONSE", response);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-blue-600 to-purple-600 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
