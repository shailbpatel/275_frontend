import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { dynamicURL } from "../Utils/urlConfig";
import styles from "./styles.module.css";

const MOP = (props) => {
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

  console.log(data);

  const handleChange = (e) => {
    try {
      setnewMOP(parseInt(e.target.value));
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMOP <= oldMOP) {
      setError("New MOP should be greater than the current MOP.");
      return;
    }

    const url = `${dynamicURL}/employer/${props.employerId}/update/mop`;

    //   await axios.post(url, data);

    try {
    } catch (error) {
      setError(error.reponse.data);
    }
  };

  //   const baseURL = `${dynamicURL}/employerId/getmop`;

  useEffect((e) => {
    setIsFormVisible(true);
    setoldMOP(3);
    //   axios.get(baseURL).then((response) => {
    //     setoldMOP(3);
    //   });
  }, []);
  return (
    <>
      <div className={styles.title}>
        <Link to="/employer/employerid/mop/changeseatcapacity">
          Please click here to change seating capacity
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
