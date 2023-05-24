import React, { useEffect } from "react";
import { useState } from "react";
import { dynamicURL } from "../Utils/urlConfig";

import styles from "./styles.module.css";

const ChangeSeatingCapacity = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [oldCapacity, setoldCapacity] = useState(null);
  const [newCapacity, setnewCapacity] = useState(null);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    try {
      setnewCapacity(parseInt(e.target.value));
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      employerId: props.userData.employerId,
      email: props.userData.email,
      role: props.userData.role,
      newCapacity: newCapacity,
    };

    if (newCapacity <= oldCapacity) {
      setError(
        "New Seating capacity should be greater than the current capacity."
      );
      return;
    }

    const url = `${dynamicURL}/employer/${props.employerId}/update/mop`;

    //   await axios.post(url, data);

    try {
    } catch (error) {
      setError(error.reponse.data);
    }
  };

  useEffect((e) => {
    setIsFormVisible(true);
    setoldCapacity(3);
    //   axios.get(baseURL).then((response) => {
    //     setoldMOP(3);
    //   });
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
