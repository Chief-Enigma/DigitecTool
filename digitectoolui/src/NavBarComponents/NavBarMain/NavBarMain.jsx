import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBarMain.css";

export const NavBarMain = () => {
  return (
    <nav className="NavBarMain">
      <ul>
        <li>
          <NavLink to="/" className="NavElement">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="plan" className="NavElement">
            Schichtplan
          </NavLink>
        </li>
        <li>
          <NavLink to="dashboard" className="NavElement">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="admindashboard" className="NavElement">
            Admin Dashboard
          </NavLink>
        </li>
        <li style={{ float: "right" }}>
          <NavLink to="account" className="NavElement">
            Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
