import { useState } from "react";
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
} from "@react-oauth/google";
import { gapi } from "gapi-script";
import jwt_decode from "jwt-decode";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
    street: "",
    city: "",
    state: "",
    zip: "",
    capacity: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    console.log("Valid submit");
    // if (Validity(data)) {
    //   //submit
    // }
    //hello
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
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className="heading">Create an Account</h1>
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
              <p></p>
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
                Sing Up
              </button>
              <p>or</p>
              <GoogleLogin
                clientId="1043703980146-807tc000l9hlh34efgp0qhued09qjk10.apps.googleusercontent.com"
                onSuccess={(codeResponse) => {
                  var token = codeResponse;
                  // var decoded = jwt_decode(token);
                  console.log(token);
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
