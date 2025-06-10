import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const navigate = useNavigate;

const ProtectedRoute = ({ requiredRole }) => {
  const { userProfile, loading } = useAuth();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!userProfile) {
        navigate("/login");
        toast.error("Access Denied");
      } else if (requiredRole && !requiredRole.includes(userProfile.role)) {
        navigate("/");
        toast.error("Access Denied");
      } else {
        setAllowed(true);
      }
    }
  }, [userProfile, requiredRole, loading, navigate]);

  if (loading || !allowed) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
