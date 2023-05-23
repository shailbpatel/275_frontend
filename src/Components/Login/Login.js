import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import {backendURL} from "../Utils/urlConfig";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "", isGoogle: false });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendURL}/login`;
      axios.post(url, data).then((response) => {
        console.log("User details :", JSON.stringify(response));
        // localStorage.setItem("user", JSON.stringify(response));
      })
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
              onSuccess={(credentialResponse) => {
                var token = credentialResponse.credential;
                var decoded = jwt_decode(token);
                console.log("Login Data: " + JSON.stringify(decoded));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
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
};

export default Login;
