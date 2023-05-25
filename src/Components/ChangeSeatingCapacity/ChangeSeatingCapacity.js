import React, { useEffect } from "react";
import { useState } from "react";
import { dynamicURL } from "../Utils/urlConfig";
import axios from "axios";
import styles from "./styles.module.css";

const ChangeSeatingCapacity = (props) => {
  const [userData, setUserData] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [oldCapacity, setoldCapacity] = useState(0);
  const [newCapacity, setnewCapacity] = useState(null);

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    try {
      setnewCapacity(parseInt(e.target.value));
    } catch (error) {}
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCapacity <= oldCapacity) {
      setSuccessMsg("");
      setError(
        "New Seating capacity should be greater than the current capacity."
      );
      return;
    }
    const url = `${dynamicURL}/seats/${userData.employerId}`;
    var post_data = {};
    post_data.seats = newCapacity;
    axios.post(url, post_data)
    .then((response) => {
      setError("");
      setoldCapacity(newCapacity);
      setnewCapacity(null);
      setSuccessMsg(response.data);
    })
    .catch((error) => {
      setSuccessMsg("");
      setError(error.response.data);
    });
  };

  useEffect((e) => {
    const localData = localStorage.getItem("user");
    if (localData) {
      const parsedData = JSON.parse(localData)
      setUserData(parsedData);
      const getSeatsUrl = `${dynamicURL}/seats/${parsedData.employerId}`;
      axios.get(getSeatsUrl)
      .then((response) => {
        setError("");
        setoldCapacity(response.data);
      })
      .catch((error) => {
        setIsFormVisible(true);
        setoldCapacity(0);
        setnewCapacity(0);
        setSuccessMsg("");
        setError(error.response.data);
      });
    }
    setIsFormVisible(true);
  }, []);


  return (
    <>
      <div className={styles.main_capacity}>
        <div className={styles.title}>
          <h3 style={{ marginTop: "2%" }}>Change Seating Capacity</h3>
          <div style={{ color: "red" }}>
            Please note that we will only support an increase in the seating
            capacity of an employer, not decrease.
          </div>
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              {isFormVisible && (
                <form
                  className={`${styles.form_container} ${styles.fade_in}`}
                  onSubmit={handleSubmit}
                >
                  <h2>Change your seating capacity</h2>

                  <input
                    type="text"
                    name="oldcapacity"
                    value={oldCapacity}
                    required
                    disabled
                    className={styles.input}
                  />
                  <input
                    type="number"
                    placeholder="New Seating Capacity"
                    name="newcapacity"
                    onChange={handleChange}
                    required
                    className={styles.input}
                  />
                  {error && <div className={styles.error_msg}>{error}</div>}
                  {successMsg && <div className={styles.success_msg}>{successMsg}</div>}
                  <button type="submit" className={styles.green_btn}>
                    Update Capacity
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeSeatingCapacity;
