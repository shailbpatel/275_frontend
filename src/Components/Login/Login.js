import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import {backendURL} from "../Utils/urlConfig";
import { GoogleLogin } from "react-google-login";

function Login({loginCallback}) {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "", isGoogle: false });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const loginAction = (updatedData = data) => {
    const url = `${backendURL}/login`;
    axios.post(url, updatedData)
    .then((response) => {
      localStorage.setItem("session_key", response.data["session_key"])
      let userData = {};
      userData.name = response.data.user.name;
      userData.email = response.data.user.email;
      userData.role = response.data.user.role;
      userData.isVerified = response.data.user.is_verified;
      userData.isGoogle = response.data.user.is_google;
      userData.employerId = response.data.user.employerId;
      userData.isManager = response.data.user.is_manager;
      localStorage.setItem("user", JSON.stringify(userData));
      loginCallback(userData);
      navigate("/");
    })
    .catch((e) => {
      setError(e.response.data);
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginAction();
    } catch (error) {
        setError(error.response.data.message);
      }
    }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
            <p>or</p>
            <GoogleLogin
                        clientId="343518867487-hbofr8ntpbnr18mrrja6f1d7aso6rk5u.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={(response) => {
                          console.log(response);
                          setData({ ...data, email: response["profileObj"]["email"], isGoogle: true });
                          loginAction({ password: "", email: response["profileObj"]["email"], isGoogle: true });
                        }}
                        onFailure={(response) => {console.log(response)}}
                        cookiePolicy={"single_host_origin"}
                      />
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
