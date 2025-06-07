import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-md py-3 px-8 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        MyApp
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/jobs" className="text-gray-700 hover:text-indigo-500">
          Jobs
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-indigo-500">
          About
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-indigo-500">
          Contact
        </Link>

        {userProfile ? (
          <>
            <span className="text-gray-700">Hi, {userProfile.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
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
