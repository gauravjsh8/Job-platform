import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaRegUser } from "react-icons/fa";
import { Handshake } from "lucide-react";

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

  // Shared link styles for animated hover effect
  const animatedLinkClasses =
    "text-gray-700 relative hover:text-indigo-600 hover:scale-105 transition duration-300 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-600 before:transition-all hover:before:w-full";
  return (
    <nav className="bg-white shadow-md py-3 px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link
        to="/"
        className="text-xl font-bold text-indigo-600 flex items-center space-x-2"
      >
        <Handshake size={30} />
        <span>Gaurav</span>
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/" className={animatedLinkClasses}>
          Home
        </Link>
        <Link to="/jobs" className={animatedLinkClasses}>
          Jobs
        </Link>

        <Link to="/about-us" className={animatedLinkClasses}>
          About
        </Link>

        <Link to="/contact-us" className={animatedLinkClasses}>
          Contact
        </Link>

        {userProfile ? (
          <div className="relative" ref={dropDownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <FaRegUser className="h-8 w-8 text-red-600 hover:text-red-800 cursor-pointer transition-colors duration-300" />
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
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 cursor-pointer transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
