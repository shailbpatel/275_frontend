import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import urlConfig from "../Utils/urlConfig";
import Select from "react-select";
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
    email: "",
    password: "",
    role: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    capacity: "",
    description: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [user, setUser] = useState([]);

  const [profile, setProfile] = useState([]);

  //   const login = useGoogleLogin({
  //     onSuccess: (codeResponse) => setUser(codeResponse),
  //     onError: (error) => console.log("Login Failed:", error),
  //   });

  //   useEffect(() => {
  //     if (user) {
  //       axios
  //         .get(
  //           `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${user.access_token}`,
  //               Accept: "application/json",
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           setProfile(res.data);
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }, [user]);

  // log out function to log the user out of google and set the profile array to null
  //   const logOut = () => {
  //     googleLogout();
  //     setProfile(null);
  //   };

  const handleSubmit = async (e) => {
    console.log("Valid submit");

    e.preventDefault();
    try {
      console.log(urlConfig.dynamicURL);
      //api for new user registration
      const url = `${urlConfig.dynamicURL}/employer?${queryString.stringify(
        data
      )}`;
      console.log(url);
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create an Account</h1>
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

            <div className={styles.role}>User type</div>
            <select
              name="role"
              value={data.role}
              required
              onChange={handleChange}
              className={styles.dropdown}
            >
              <option selected="selected" hidden="hidden">
                Select a role
              </option>
              <option label="Employee">Employee</option>
              <option label="Employer">Employer</option>
            </select>

            {data.role === "Employer" ? (
              <>
                <div className={styles.role}>Space Capacity</div>
                <input
                  type="number"
                  name="capacity"
                  min="3"
                  max="100"
                  className={styles.input}
                  defaultValue="3"
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <div className={styles.role}>Employer Name: </div>
                <input
                  type="text"
                  name="employer"
                  className={styles.input}
                  onChange={handleChange}
                />
              </>
            )}

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
            {error && <div className={styles.error_msg}>{error}</div>}
            <div className={styles.googleLogin}>
              <button
                className={styles.green_btn}
                onClick={(handleClick) => {
                  console.log("Data :", data);
                }}
              >
                Sign Up
              </button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
