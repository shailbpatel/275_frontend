import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./Components/LandingPage/LandingPage";
import BulkReservation from "./Components/BulkReservation/BulkReservation";
import SeatReservation from "./Components/SeatReservation/SeatReservation";
import ComplianceCheck from "./Components/ComplianceCheck/ComplianceCheck";
import AttendanceReport from "./Components/AttendanceReport/AttendanceReport";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <GoogleOAuthProvider clientId="1043703980146-807tc000l9hlh34efgp0qhued09qjk10.apps.googleusercontent.com">
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
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
