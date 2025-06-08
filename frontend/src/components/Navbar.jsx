import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaRegUser } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const { userProfile, logout, role } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <nav className="bg-white shadow-md py-3 px-8 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Job-Platform
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
          <div className="relative " ref={dropDownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <FaRegUser className="h-8 w-8 text-gray-700 hover:text-indigo-600 cursor-pointer" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md border z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/my-jobs"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  My Jobs
                </Link>
                {role === "admin" && (
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
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
