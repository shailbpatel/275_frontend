import * as React from "react";

import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar(props) {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Work-In-Office Reservation System
      </Link>
      <ul>
        <li>
          <Link to="/">
            <button className="nav_btn">Home </button>
          </Link>
        </li>

        {!props.isLoggedIn ? (
          <>
            <li>
              <Link to="/login">
                <button className="nav_btn">Login </button>
              </Link>
            </li>
          </>
        ) : (
          <>
            {props.userRole == "Employer" ? (
              <>
                <li>
                  <Link to="/employer/employerid/bulkreservation">
                    <button className="nav_btn">Bulk Test </button>
                  </Link>
                </li>
                <li>
                  <Link to="/employer/employerid/mop">
                    <button className="nav_btn"> MOP </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/employee/employeeid/seatreservation">
                    <button className="nav_btn">Seat Test </button>
                  </Link>
                </li>
                <li>
                  <Link to="/employee/employeeid/attendacereport">
                    <button className="nav_btn">Report Test </button>
                  </Link>
                </li>
                <li>
                  <Link to="/employee/employeeid/gtd">
                    <button className="nav_btn">GTD</button>
                  </Link>
                </li>
              </>
            )}
            <Link to="/">
              <li>
                <button className="nav_btn pt-3" onClick={props.logoutCallback}>
                  Logout
                </button>
              </li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
