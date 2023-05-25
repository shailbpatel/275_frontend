import { useState, React, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LandingPage from "./Components/LandingPage/LandingPage";
import BulkReservation from "./Components/BulkRegistration/BulkRegistration";
import SeatReservation from "./Components/SeatReservation/SeatReservation";
import ComplianceCheck from "./Components/ComplianceCheck/ComplianceCheck";
import AttendanceReport from "./Components/AttendanceReport/AttendanceReport";
import MOP from "./Components/MOP/MOP";
import GTD from "./Components/GTD/GTD";
import ChangeSeatingCapacity from "./Components/ChangeSeatingCapacity/ChangeSeatingCapacity";

function App() {
  const emptyUserData = {
    name: "",
    email: "",
    role: "",
    isVerified: false,
    isGoogle: false,
    employerId: "",
    isManager: false
  };
  const [userData, setUserData] = useState(emptyUserData);
  const [sessionKey, setSessionKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("user");
    const sessionKey = localStorage.getItem("session_key");
    if (localData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(localData));
      setSessionKey(sessionKey);
    }
  }, []);

  const loginCallback = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
  };

  const logoutCallback = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("session_key");
    setIsLoggedIn(false);
    setUserData(emptyUserData);
    setSessionKey("");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <GoogleOAuthProvider clientId="343518867487-hbofr8ntpbnr18mrrja6f1d7aso6rk5u.apps.googleusercontent.com">
          <Navbar
            isLoggedIn={isLoggedIn}
            userRole={userData.role}
            isManager={userData.isManager}
            logoutCallback={logoutCallback}
          />
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route
              path="/login"
              exact
              element={<Login loginCallback={loginCallback} />}
            />
            <Route
              path="/employer/employerid/bulkreservation"
              exact
              element={<BulkReservation userData={userData} />}
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
            <Route
              path="/employer/employerid/mop"
              exact
              element={<MOP userData={userData} />}
            />
            <Route
              path="/employee/employeeid/gtd"
              exact
              element={<GTD userData={userData} />}
            />
            <Route
              path="/employer/employerid/mop/changeseatcapacity"
              exact
              element={<ChangeSeatingCapacity userData={userData} />}
            />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
