import React, { useState } from "react";

const RegistrationPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [photo, setPhoto] = useState(null);
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.prevetDefault();
  };
  return (
    <div className="h-screen bg-gradient-to-tr from-purple-600 via-pink-500 to-red-400 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Create Account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 rounded border border-gray-300"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              className="w-full px-3 py-2 rounded border border-gray-300"
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="photo" className="block text-gray-700 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-2xl hover:bg-pink-600 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
