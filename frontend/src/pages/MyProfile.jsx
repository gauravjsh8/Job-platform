import React from "react";
import { useAuth } from "../context/AuthProvider";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaSyncAlt,
} from "react-icons/fa";

const MyProfile = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-white">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
        <div className="flex items-center gap-5">
          <img
            src={userProfile.photoUrl}
            alt={userProfile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-indigo-800 tracking-wide">
              {userProfile.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" /> {userProfile.email}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
              <FaUserTag /> Role: {userProfile.role}
            </span>
          </div>
        </div>

        <div className="mt-6 text-gray-700 space-y-2">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-500" />
            <strong>Joined:</strong>{" "}
            {new Date(userProfile.createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <FaSyncAlt className="text-yellow-600" />
            <strong>Last Updated:</strong>{" "}
            {new Date(userProfile.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
