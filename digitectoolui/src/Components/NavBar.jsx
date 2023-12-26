import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link to="Plan">
            <a>Schichtplan</a>
          </Link>
        </li>
        <li style={{ display: props.loggedIn ? "block" : "none" }}>
          <Link to="Dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li style={{ display: props.adminloggedIn ? "block" : "none" }}>
          <Link to="AdminDashboard">
            <a>Admin Dashboard</a>
          </Link>
        </li>
        <li style={{ float: "right" }}>
          <Link to="Account">
            <a>Account</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
