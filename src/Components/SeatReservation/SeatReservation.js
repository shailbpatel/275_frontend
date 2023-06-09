import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Button, notification } from "antd";

import moment from "moment";
import axios from "axios";
import { backendURL } from "../Utils/urlConfig";

import "./styles.css";

const { RangePicker } = DatePicker;
const SeatReservation = (props) => {
  const [dates, setDates] = useState([]);
  const [startDate, setstartDate] = useState(null);

  const rangePickerRef = useRef(null);

  const getDates = (values) => {
    if (values != null) {
      setDates(
        values.map((item) => {
          return moment(item.$d).format("MM/DD/YY");
        })
      );
    } else {
      setDates([]);
      setstartDate(null);
    }
  };

  const onCalendarChange = (date) => {
    if (date != null && date[0] != null) {
      setstartDate(date[0]);
    }
  };

  const disabledDate = (current) => {
    if (!current) return true;

    // Disable past dates
    const isPast = current < moment().startOf("day");

    // Disable weekends
    const isWeekend = current.day() === 6 || current.day() === 0;

    // Disable dates before the beginning of next week
    const startOfNext10Week = moment().add(10, "weeks").startOf("week");

    const isBeforeNextWeek = current > startOfNext10Week;

    //Disable dates outside of current week
    let isOutsideCurrentWeek = false;

    if (startDate != null) {
      const startOfWeek = startDate.add(1, "weeks").startOf("week");
      isOutsideCurrentWeek = current >= startOfWeek;
    }

    return isPast || isWeekend || isBeforeNextWeek || isOutsideCurrentWeek;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${backendURL}/reservation/${props.userData.employerId}`;
    const datesToSend = {
      startDate: dates[0],
      endDate: dates[1],
      email: props.userData.email,
    };

    axios.post(url, datesToSend).then((response) => {
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
    });

    setDates([]);
    setstartDate(null);
  };

  return (
    <>
      <h3 className="title">Seat Reservation</h3>

      <div className="seat_reservation">
        <div>
          <Link to="/employee/employeeid/compliancecheck">
            <Button type="primary">Compliance Check</Button>
          </Link>
        </div>

        <div className="range_picker">
          <h4>Select your start and end date to reserve a seat</h4>
          <form onSubmit={handleSubmit}>
            <RangePicker
              onCalendarChange={onCalendarChange}
              onChange={getDates}
              disabledDate={disabledDate}
              format="MM-DD-YYYY"
              ref={rangePickerRef}
            />
            <Button type="primary" htmlType="submit" className="submit_dates">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SeatReservation;
