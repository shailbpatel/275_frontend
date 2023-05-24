import React, { useState } from "react";
import { Select, Button, Space } from "antd";
import { dynamicURL } from "../Utils/urlConfig";
import axios from "axios";
import "./styles.css";

const GTD = (props) => {
  const [gtdDay, setGtdDay] = useState("");
  const [error, setError] = useState(null);

  const onChange = (value) => {
    setGtdDay(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      employerId: props.userData.employerId,
      email: props.userData.email,
      role: props.userData.role,
      name: props.userData.name,
      gtdDay: gtdDay,
    };

    // const url = `${dynamicURL}/${props.userData.role}/employeeid/gtd`;

    // try {
    //   axios.post(url, data).then((response) => {
    //     console.log(response.data);
    //   });
    // } catch (e) {
    //   console.log(e.response.data);
    //   setError(e.response.data);
    // }

    setGtdDay(null);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <div className="title">
        <h3>Select any day from the following list to set it as a GTD</h3>
        <small style={{ color: "red" }}>
          Please note that this day will mark as GTD for the next ten weeks
        </small>
      </div>

      <div className="gtd">
        <div className="gtd-form">
          <form onSubmit={handleSubmit}>
            <Select
              showSearch
              placeholder="Select a day"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Monday",
                },
                {
                  value: "2",
                  label: "Tuesday",
                },
                {
                  value: "3",
                  label: "Wednesday",
                },
                {
                  value: "4",
                  label: "Thursday",
                },
                {
                  value: "5",
                  label: "Friday",
                },
              ]}
            />
            <Space>
              <Button type="primary" htmlType="submit" className="gtd-button">
                Submit
              </Button>
            </Space>
          </form>
        </div>
      </div>
    </>
  );
};

export default GTD;
