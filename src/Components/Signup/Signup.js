import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { clientId, backendURL } from "../Utils/urlConfig";
import queryString from "query-string";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    id: "",
    employer_id: "",
    email: "",
    password: "",
    role: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    seats: "3",
    is_google: false,
    is_verified: false,
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    const value = input.type === "number" ? parseInt(input.value) : input.value;
    setData({ ...data, [input.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.role === "Employer") {
        const { is_verified, role, ...post_data } = data;
        const url = `${backendURL}/employer?${queryString.stringify(
          post_data
        )}`;
        const { data: res } = await axios.post(url, data);
        console.log(res.status);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h2 style={{ color: "white", marginLeft: "2rem" }}>
            Already have an account?
          </h2>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>

        <div className={styles.right}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.role}>User type</div>
          <form className={styles.form_container}>
            <select
              name="role"
              required
              onChange={handleChange}
              className={styles.dropdown}
              defaultValue={""}
            >
              <option value="">Select a role</option>
              <option label="Employee">Employee</option>
              <option label="Employer">Employer</option>
            </select>
          </form>
          {data.role === "Employee" ? (
            <h2>Employee Registration Form</h2>
          ) : data.role === "Employer" ? (
            <>
              <h2>Create an Employer Account</h2>
              <form
                className={styles.internal_form_container}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                  required
                  className={styles.input}
                />
                <input
                  type="id"
                  placeholder="ID (Short code to identify your company)"
                  name="id"
                  onChange={handleChange}
                  value={data.id}
                  required
                  className={styles.input}
                />
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
                <input
                  type="number"
                  name="seats"
                  min="3"
                  max="100"
                  className={styles.input}
                  value={data.seats}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  placeholder="Street"
                  name="street"
                  onChange={handleChange}
                  value={data.street}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  value={data.city}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="State"
                  name="state"
                  onChange={handleChange}
                  value={data.state}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Zip code"
                  name="zip"
                  onChange={handleChange}
                  value={data.zip}
                  className={styles.input}
                />
              </form>
              <div className={styles.googleLogin}>
                <input
                  type="submit"
                  value="Sign Up"
                  onClick={handleSubmit}
                  className={styles.green_btn}
                />
                <p>or</p>

                <GoogleLogin
                  clientId="1043703980146-807tc000l9hlh34efgp0qhued09qjk10.apps.googleusercontent.com"
                  onSuccess={(codeResponse) => {
                    var token = codeResponse.credential;
                    var decoded = jwt_decode(token);
                    data.name = decoded.name;
                    data.email = decoded.email;
                    data.password = decoded.password;
                    setData(data);
                    console.log("Signup Data: " + JSON.stringify(data));
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
