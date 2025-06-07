import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
