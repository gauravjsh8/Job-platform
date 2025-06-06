import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const payload = { email: user.email, password: user.password };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = await response.data;
      console.log("DATA", data);
      toast.success("Logged in successfully!");
      setUser({ email: "", password: "" });

      setTimeout(() => {
        navigate("/ ");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
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
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              id="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-2xl hover:bg-indigo-700 transition cursor-pointer"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
