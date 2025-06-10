import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
const AllUsers = () => {
  const { role: loggedInUserRole, userProfile } = useAuth();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUser, setTotalUser] = useState(0);
  const limit = 5;
  const totalPages = Math.ceil(totalUser / limit);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/allusers?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        setUsers(response.data.users);
        setTotalUser(response.data.total);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch user list.");
      }
    };
    fetchAllUsers();
  }, [page]);

  const handleOpenConfirmModal = (message, action) => {
    setModalMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
    setModalMessage("");
  };

  const executeDelete = async (userId) => {
    handleCloseConfirmModal();
    try {
      await axios.delete(
        `http://localhost:3000/api/users/delete-user/${userId}`,
        { withCredentials: true }
      );
      toast.success("User deleted successfully.");
      const response = await axios.get(
        `http://localhost:3000/api/users/allusers?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setUsers(response.data.users);
      setTotalUser(response.data.total);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(
        error?.response?.data?.message ||
          "Delete failed. Make sure you have permission."
      );
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (
      loggedInUserRole === "superadmin" &&
      userId === userProfile._id &&
      newRole !== "superadmin"
    ) {
      toast.error(
        "You cannot change your own role from superadmin. Another superadmin must do this."
      );
      const originalRole = users.find((u) => u._id === userId)?.role;
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === userId ? { ...u, role: originalRole } : u
        )
      );
      return;
    }

    handleOpenConfirmModal(
      `Are you sure you want to change this user's role to "${newRole}"?`,
      async () => {
        try {
          await axios.put(
            `http://localhost:3000/api/users/update-user/${userId}`,
            { role: newRole },
            { withCredentials: true }
          );
          toast.success(`User role updated to "${newRole}" successfully.`);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            )
          );
        } catch (error) {
          console.error("Failed to update user role:", error);
          toast.error(
            error?.response?.data?.message || "Failed to update user role."
          );
          const originalRole = users.find((u) => u._id === userId)?.role;
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u._id === userId ? { ...u, role: originalRole } : u
            )
          );
        } finally {
          handleCloseConfirmModal();
        }
      }
    );
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 my-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          All Users
        </h2>
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  {loggedInUserRole === "superadmin" && (
                    <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-800">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      {loggedInUserRole === "superadmin" &&
                      user._id !== userProfile?._id ? (
                        <select
                          value={user.role || "user"}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                      ) : (
                        <span
                          className={`capitalize ${
                            user.role === "superadmin"
                              ? "font-bold text-indigo-600"
                              : ""
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      )}
                    </td>
                    {loggedInUserRole === "superadmin" && (
                      <td className="py-3 px-4 whitespace-nowrap text-sm">
                        {user.role !== "superadmin" &&
                          user._id !== userProfile?._id && (
                            <button
                              className="text-red-600 hover:text-red-800 transition-colors"
                              onClick={() =>
                                handleOpenConfirmModal(
                                  "Are you sure you want to delete this user?",
                                  () => executeDelete(user._id)
                                )
                              }
                              aria-label="Delete User"
                              title="Delete User"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          )}
                        {user.role === "superadmin" &&
                          user._id === userProfile?._id && (
                            <span className="text-gray-400 italic text-xs">
                              Cannot delete self
                            </span>
                          )}
                        {user.role === "superadmin" &&
                          user._id !== userProfile?._id && (
                            <span className="text-gray-400 italic text-xs">
                              Cannot delete Superadmin
                            </span>
                          )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-6 items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Previous
          </button>

          <span className="px-4 py-2 text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
              page === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Action
            </h3>
            <p className="mb-6 text-gray-700">{modalMessage}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseConfirmModal}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUsers;
