import React from "react";
import { useAuth } from "../context/AuthProvider";

const MyProfile = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-80 mx-auto mt-30 p-10 bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex items-center gap-6">
        <img
          src={userProfile.photoUrl}
          alt={userProfile.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {userProfile.name}
          </h2>
          <p className="text-gray-600">{userProfile.email}</p>
          <span className="mt-1 inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
            Role: {userProfile.role}
          </span>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(userProfile.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(userProfile.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
