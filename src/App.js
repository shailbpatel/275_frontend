import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/index";
import { useState } from "react";
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  const [userData, setUserData] = useState({ name: "", email: "", role: "", isVerified: false, isGoogle: false, employerId: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userDataCallback = (userData) => {
    console.log(userData);
  };
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login userDataCallback={userDataCallback} />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
