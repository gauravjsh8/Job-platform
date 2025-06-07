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

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/contact-us" element={<ContactPage />}></Route>
        <Route path="/about-us" element={<AboutPage />}></Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="create-job" element={<CreateJob />} />
          <Route index element={<DashboardHome />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
