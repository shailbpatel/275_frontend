import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { dynamicURL } from "../Utils/urlConfig";
import styles from "./styles.module.css";

const MOP = (props) => {
  const navigate = useNavigate();
  const [oldMOP, setoldMOP] = useState(0);
  const [newMOP, setnewMOP] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [error, setError] = useState("");
  const data = {
    employerId: props.userData.employerId,
    emailId: props.userData.email,
    newMOP: newMOP,
    role: props.userData.role,
  };
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (
      localStorage.getItem("session_key") === null ||
      localStorage.getItem("session_key") === ""
    ) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    try {
      setnewMOP(parseInt(e.target.value));
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (newMOP >= 0 && newMOP <= 5) {
    setError("New MOP should be between 0 to 5 inclusive.");
    return;
  }
  const url = `${dynamicURL}/mop`;
    var post_data = {};
    post_data.role = props.userData.role;
    post_data.email = props.userData.email;
    post_data.employerId = props.userData.employerId;
    post_data.mop = newMOP;
    axios.post(url, post_data)
    .then((response) => {
      setError("");
      setSuccessMsg(response.data);
      setoldMOP(newMOP);
      setnewMOP(0);
    })
    .catch((error) => {
      setSuccessMsg("");
      setError(error.response.data);
    });
  };

  useEffect((e) => {
    setIsFormVisible(true);
    var email = "";
    if(props.userData.role === "Employee") {
      email = props.userData.email;
    }
    const getMOPUrl = `${dynamicURL}/mop?employerId=${props.userData.employerId}&email=${email}`;
    axios.get(getMOPUrl)
    .then((response) => {
      setError("");
      setoldMOP(response.data);
    })
    .catch((error) => {
      setSuccessMsg("");
      setError(error.response.data);
    });
  }, []);


  return (
    <>
    <div className={styles.title}>
        <Link to="/employer/employerid/mop/changeseatcapacity">
          <h3 style={{ color: "green", textDecoration: "none" }}>
            Please click here to change seating capacity
          </h3>
        </Link>
      </div>
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          {isFormVisible && (
            <form
              className={`${styles.form_container} ${styles.fade_in}`}
              onSubmit={handleSubmit}
            >
              <h2>Change your MOP (Minimum Office Presence)</h2>
              <input
                type="text"
                placeholder="Current MOP"
                name="mop"
                value={oldMOP}
                required
                disabled
                className={styles.input}
              />
              <input
                type="number"
                placeholder="New MOP"
                name="newMOP"
                onChange={handleChange}
                min="0"
                max="5"
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              {successMsg && <div className={styles.success_msg}>{successMsg}</div>}
              <button type="submit" className={styles.green_btn}>
                Update MOP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default MOP;
