import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Navbar() {
  return (
    <nav className="nav">
      {/* <img src="frontend/src/Components/Utils/Images/logo.png"></img> */}
      <Link to="/" className="site-title">
        Work-In-Office Reservation System
      </Link>
      <ul>
        <li>
          <Link to="/">
            <button className="nav_btn">Home </button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button className="nav_btn">About </button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button className="nav_btn">Login </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
