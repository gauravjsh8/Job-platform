import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactUs";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/contact-us" element={<ContactPage />}></Route>
        <Route path="/about-us" element={<AboutPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
