import { Route, Routes, useLocation } from "react-router-dom";
import RegistrationPage from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactUs";
import AboutPage from "./pages/AboutPage";
import DashboardLayout from "./pages/Dashboard";
import CreateJob from "./components/dashboard/CreateJob";
import DashboardHome from "./components/dashboard/DashboardHome";
import PostedJobs from "./pages/PostedJobs";
import ViewJob from "./pages/ViewJob";
import ApplyJob from "./pages/ApplyJob";
import UserCreatedJobs from "./pages/UserCreatedJobs";
import MyProfile from "./pages/MyProfile";
import UpdateJob from "./pages/UpdateJob";
import MyJobs from "./pages/MyJobs";
import AllUsers from "./pages/AllUsers";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboard && <Navbar />}

      <div className={!isDashboard ? "pt-14" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/jobs" element={<PostedJobs />} />
          <Route path="/jobs/:id" element={<ViewJob />} />
          <Route path="/jobs/:id/apply" element={<ApplyJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/profile" element={<MyProfile />} />

          <Route element={<ProtectedRoute requiredRole="admin" />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="/dashboard/create-job" element={<CreateJob />} />
              <Route index element={<DashboardHome />} />
              <Route
                path="/dashboard/posted-jobs"
                element={<UserCreatedJobs />}
              />
              <Route path="/dashboard/profile" element={<MyProfile />} />
              <Route path="/dashboard/updatejob/:id" element={<UpdateJob />} />
              <Route path="/dashboard/all-users" element={<AllUsers />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
