import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker, Space } from "antd";
import moment from "moment";

import "./styles.css";

const { RangePicker } = DatePicker;
const SeatReservation = () => {
  const [dates, setDates] = useState([]);
  const [startDate, setstartDate] = useState(null);

  console.log(dates);

  const getDates = (values) => {
    if (values != null) {
      setDates(
        values.map((item) => {
          return moment(item.$d).format("YYYY-DD-MM");
        })
      );
    }
  };

  const onCalendarChange = (date, dateString) => {
    console.log(date);
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
    // // Disable dates outside of current week
    let isOutsideCurrentWeek = false;
    if (startDate != null) {
      const startOfWeek = startDate.add(1, "weeks").startOf("week");
      isOutsideCurrentWeek = current >= startOfWeek;
    }

    return isPast || isWeekend || isBeforeNextWeek || isOutsideCurrentWeek;
  };

  return (
    <>
      <h3 className="title">Seat Reservation</h3>

      <div className="seat_reservation">
        <div>
          <Link to="/employee/employeeid/compliancecheck">
            <button className="compliance_btn">Compliance Check</button>
          </Link>
        </div>
        <div className="range_picker">
          <RangePicker
            onCalendarChange={onCalendarChange}
            onChange={getDates}
            disabledDate={disabledDate}
            format="MM-DD-YYYY"
          />
        </div>
      </div>
    </>
  );
};

export default SeatReservation;
