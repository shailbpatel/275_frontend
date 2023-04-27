import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
