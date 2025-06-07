import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  const logout = async () => {
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
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
    const fetchUser = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:3000/api/users/user-profile",
          {
            withCredentials: true,
          }
        );
        setUserProfile(res.data);
        setRole(res.data.role);
      } catch (err) {
        setUserProfile(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userProfile, loading, setUserProfile, logout, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
