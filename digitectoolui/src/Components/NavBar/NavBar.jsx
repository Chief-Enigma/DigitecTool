import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { Navigate } from "react-router-dom";


export const NavBar = (props) => {
  return (
    <nav className="MainNavBar">
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
        <li style={{ display: props.userrole === "Admin" ? "block" : "none" }}>
          <Link to="AdminDashboard">
            <a>Admin Dashboard</a>
          </Link>
        </li>
        <li style={{ float: "right" }}>
          {props.loggedIn ? (
            <Link to="Account">
              <a>Account</a>
            </Link>
          ) : (
            <Link to="Login">
              <a>LogIn</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
