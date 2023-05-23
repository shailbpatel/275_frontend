import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import { useState } from "react";
import Login from "./Components/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./Components/LandingPage/LandingPage";
import BulkReservation from "./Components/BulkRegistration/BulkRegistration";
import SeatReservation from "./Components/SeatReservation/SeatReservation";
import ComplianceCheck from "./Components/ComplianceCheck/ComplianceCheck";
import AttendanceReport from "./Components/AttendanceReport/AttendanceReport";

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
            <Route path="/login" exact element={<Login />} />
            <Route
              path="/employer/employerid/bulkreservation"
              exact
              element={<BulkReservation />}
            />
            <Route
              path="/employee/employeeid/seatreservation"
              exact
              element={<SeatReservation />}
            />
            <Route
              path="/employee/employeeid/compliancecheck"
              exact
              element={<ComplianceCheck />}
            />
            <Route
              path="/employee/employeeid/attendacereport"
              exact
              element={<AttendanceReport />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
