import { Route, Routes, useLocation } from "react-router-dom";
import RegistrationPage from "./pages/Register";
import Home from "./pages/Home";
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Messages from "./components/dashboard/Messages";
import Footer from "./components/Footer";
import AppliedJobsList from "./pages/AppliedJobList";

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}

      <div className={`flex-grow ${!isDashboard ? "pt-14" : ""}`}>
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            element={<ProtectedRoute requiredRole={["superadmin", "admin"]} />}
          >
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
              <Route path="/dashboard/messages" element={<Messages />} />
              <Route
                path="/dashboard//applied/jobs"
                element={<AppliedJobsList />}
              />
            </Route>
          </Route>
        </Routes>
      </div>

      {!isDashboard && <Footer />}
    </div>
  );
}
export default App;
