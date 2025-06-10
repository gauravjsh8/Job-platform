import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/users/user-profile`, {
        withCredentials: true,
      });
      setUserProfile(res.data);
      setRole(res.data.role);
      console.log(res.data);
    } catch (err) {
      setUserProfile(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUserProfile(null);
      setRole(null);
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        loading,
        setUserProfile,
        logout,
        role,
        setRole,
        fetchUser, //
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
