import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { userProfile, logout, role, setUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-8 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        MyApp
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-indigo-500">
          Home
        </Link>
        <Link to="/jobs" className="text-gray-700 hover:text-indigo-500">
          Jobs
        </Link>
        <Link to="/about-us" className="text-gray-700 hover:text-indigo-500">
          About
        </Link>
        <Link to="/contact-us" className="text-gray-700 hover:text-indigo-500">
          Contact
        </Link>

        {userProfile ? (
          <>
            <span className="text-gray-700 font-extrabold">
              Hi, {userProfile.name}
            </span>

            {role === "admin" && (
              <Link
                to="/dashboard"
                className="textwhite hover:bg-green-800 bg-green-500 px-3 py-1 rounded"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
