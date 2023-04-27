import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientID from "./Components/Utils/urlConfig";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <h1>project</h1>
        <GoogleOAuthProvider clientId="1043703980146-807tc000l9hlh34efgp0qhued09qjk10.apps.googleusercontent.com">
          <Routes>
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
