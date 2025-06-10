import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { API_BASE_URL } from "../utils/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, fetchUser } = useAuth();

  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!user.email) newErrors.email = "Email is required";
    if (!user.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      await fetchUser();
      setUserProfile(data.user);

      toast.success("Logged in successfully!");
      setUser({ email: "", password: "" });
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-700 via-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
                placeholder="********"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2 cursor-pointer text-sm text-indigo-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-2xl hover:bg-indigo-700 transition cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-indigo-500 font-semibold hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Register now
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
