import axios from "axios";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/utils";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role set here
  });

  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!user.name) newErrors.name = "Full name is required.";
    if (!user.email) newErrors.email = "Email is required.";
    if (!user.password) newErrors.password = "Password is required.";
    if (!photo) newErrors.photo = "Photo is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email && !emailRegex.test(user.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (user.password && user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (photo && !allowedTypes.includes(photo.type)) {
      newErrors.photo = "Only JPG, JPEG, or PNG files are allowed.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/register`,
        formData
      );
      toast.success(response.data.message);
      setUser({ name: "", email: "", password: "", role: "user" });
      setPhoto(null);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-400 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Create Account
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded border ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password with toggle */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="photo" className="block text-gray-700 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className={`border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" w-full ${
                errors.photo ? "border border-red-500" : ""
              }`}
            />
            {errors.photo && (
              <p className="text-sm text-red-500">{errors.photo}</p>
            )}
            {photo && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {photo.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-pink-500 text-white font-semibold py-2 rounded-2xl transition ${
              submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-600"
            }`}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
