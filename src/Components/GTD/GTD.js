import React, { useEffect, useState } from "react";
import { Select, Button, Space, notification } from "antd";
import { backendURL } from "../Utils/urlConfig";
import axios from "axios";
import "./styles.css";

const GTD = (props) => {
  const [gtdDay, setGtdDay] = useState("");

  const onChange = (value) => {
    setGtdDay(value);
  };

  useEffect(() => {
    const url = `${backendURL}/gtd/${props.userData.employerId}/${props.userData.email}`;
    axios.get(url)
    .then((response) => {
      setGtdDay(response.data);
    })
    .catch(() => {
      setGtdDay(null);
    });
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${backendURL}/gtd/${props.userData.employerId}/${props.userData.email}/${gtdDay}`;
    axios.post(url).then((response) => {
      notification.success({
        message: "Success",
        description: response.data,
        style: {
          backgroundColor: "#f6ffed",
          borderColor: "#b7eb8f",
          color: "#389e0d",
        },
      });
    })
    .catch((e) => {
      notification.error({
        message: "Error",
        description: e.response.data,
        style: {
          backgroundColor: "#fff1f0",
          borderColor: "#ffa39e",
          color: "#cf1322",
        },
      });
      setGtdDay(null);
    });
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
              value={gtdDay}
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
