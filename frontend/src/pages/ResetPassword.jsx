import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/reset-password/${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Password reset successful");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false); // stop loading
    }
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
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-lg ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
