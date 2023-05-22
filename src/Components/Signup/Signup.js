import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import { backendURL } from "../Utils/urlConfig";
import queryString from "query-string";
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const [data, setData] = useState({
    name: "",
    id: "",
    employer_id: "",
    email: "",
    password: "",
    manager_id: "",
    role: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    seats: "3",
    is_google: false,
    is_verified: false,
    all_employers: [],
  });
  const [employees, setEmployees] = useState([]);
  const [googleTokenId, setGoogleTokenId] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    populateAllEmployers();
  }, []);
  
  const handleChange = ({ currentTarget: input }) => {
    const value = input.type === "number" ? parseInt(input.value) : input.value;

    if(input.name === "role" && value !== data.role) {
      setData(prevData => ({
        ...prevData,
        name: "",
        id: "",
        employer_id: "",
        email: "",
        password: "",
        manager_id: "",
        role: value,
        street: "",
        city: "",
        state: "",
        zip: "",
        seats: "3",
        is_google: false,
        is_verified: false,
      }));
      setEmployees([]);
      setDisabled(false);
      setError("");
      setGoogleTokenId("");
    } else if(input.name === "employer_id") {
        getEmployees(value)
          .then((data) => setEmployees(data))
          .catch((error) => setEmployees([]));
      }
    setData({ ...data, [input.name] : value });
};


  const getEmployees = (employer) => {
    const url = `${backendURL}/employer/${employer}/employees`;
    return fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .catch(() => []);
  };

  const populateAllEmployers = () => {
    const url = `${backendURL}/employer`;
    axios.get(url)
      .then((response) => {
        const employers = response.data;
        setData((prevData) => ({ ...prevData, all_employers: employers }));
      })
      .catch((error) => console.error(error));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(data.role === "Employer") {
        const { is_verified, role, all_employers, ...post_data } = data;
        post_data["tokenId"] = googleTokenId;
        const url = `${backendURL}/employer?${queryString.stringify(post_data)}`;
        axios.post(url).then(() => {
          populateAllEmployers();
          setData(prevData => ({
            ...prevData,
            name: "",
            id: "",
            employer_id: "",
            email: "",
            password: "",
            manager_id: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            seats: "3",
            is_google: false,
            is_verified: false,
          }));
          setEmployees([]);
          setError("");
          setDisabled(false);
          setGoogleTokenId("");
          navigate('/login');
        });
      }
      else {
        const { id, is_verified, role, all_employers, ...post_data } = data;
        const url = `${backendURL}/employee/create/${post_data['employer_id']}?${queryString.stringify(post_data)}`;
        post_data["tokenId"] = googleTokenId;
        axios.post(url).then(() => {
          getEmployees(post_data['employer_id'])
          .then((data) => {
            setEmployees(data);
            setData(prevData => ({
              ...prevData,
              name: "",
              id: "",
              employer_id: "",
              email: "",
              password: "",
              manager_id: "",
              street: "",
              city: "",
              state: "",
              zip: "",
              is_google: false,
              is_verified: false,
            }));
            setEmployees([]);
            setError("");
            setDisabled(false);
            setGoogleTokenId("");
            navigate('/login');
          });
        })
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

    const handlerEmployerGoogleSignup = (response) => {
      if(!("error" in response)) {
        setData(prevData => ({
          ...prevData,
          name: response["profileObj"]["name"],
          id: "",
          employer_id: "",
          email: response["profileObj"]["email"],
          password: "",
          manager_id: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          is_google: true,
          is_verified: false,
        }));

        setGoogleTokenId(response["tokenId"]);
        alert("Fill the remaining fields and signup!");
        setDisabled(true);
      }
    }

    const handlerEmployeeGoogleSignup = (response) => {
      if(!("error" in response)) {
        setData(prevData => ({
          ...prevData,
          name: response["profileObj"]["name"],
          id: "",
          employer_id: "",
          email: response["profileObj"]["email"],
          password: "",
          manager_id: "",
          street: "",
          city: "",
          state: "",
          zip: "",
          is_google: true,
          is_verified: false,
        }));
        setGoogleTokenId(response["tokenId"]);
        alert("Fill the remaining fields and signup!");
        setDisabled(true);
      }
    }


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
              <>
                <h3>Employee Registration Form</h3>
                <form className={styles.internal_form_container} onSubmit={handleSubmit}>
                  <select className={styles.dropdown} id="employer_id" name="employer_id" onChange={handleChange}>
                  <option value="">Select an Employer</option>
                  {data.all_employers.length > 0 && (data.all_employers.map((employer) => (
                      <option key={employer.id} value={employer.id}>
                          {employer.name}
                      </option>
                  )))}
                  </select>

                  {data.employer_id && (
                  <>
                  {employees && (
                    <select className={styles.dropdown} id="manager_id" name="manager_id" onChange={handleChange}>
                      <option value="">Select your Manager</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    required
                    className={styles.input}
                    disabled={isDisabled}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className={styles.input}
                    disabled={isDisabled}
                    />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={styles.input}
                    disabled={isDisabled}
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

                <div className={styles.googleLogin}>
                    <input
                        type="submit"
                        value="Sign In"
                        onClick={handleSubmit}
                        className={styles.green_btn}
                        />
                    <p>or</p>

                    <GoogleLogin
                      clientId="343518867487-hbofr8ntpbnr18mrrja6f1d7aso6rk5u.apps.googleusercontent.com"
                      buttonText="Signup with Google"
                      onSuccess={handlerEmployeeGoogleSignup}
                      onFailure={handlerEmployeeGoogleSignup}
                      cookiePolicy={'single_host_origin'}
                      />
                </div>
                </>
                )}
                </form>
              </>
            ) : (
                data.role === "Employer" ? (
                <>
                <h2>Create an Employer Account</h2>
                <form name="employerSignupForm" className={styles.internal_form_container} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        required
                        className={styles.input}
                        disabled={isDisabled}
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
                        disabled={isDisabled}
                        />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                        disabled={isDisabled}
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
                      clientId="343518867487-hbofr8ntpbnr18mrrja6f1d7aso6rk5u.apps.googleusercontent.com"
                      buttonText="Signup with Google"
                      onSuccess={handlerEmployerGoogleSignup}
                      onFailure={handlerEmployerGoogleSignup}
                      cookiePolicy={'single_host_origin'}
                    />
                </div>
                </>
                )  : (
                    <></>
                )
            )}

      </div>
    </div>
    </div>
  );
};

export default Signup;
