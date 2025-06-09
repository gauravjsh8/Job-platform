import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const ProtectedRoute = ({ requiredRole }) => {
  const navigate = useNavigate();
  const { userProfile, loading } = useAuth();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!userProfile) {
        navigate("/login");
        toast.error("Access Denied");
      } else if (requiredRole && userProfile.role !== requiredRole) {
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
