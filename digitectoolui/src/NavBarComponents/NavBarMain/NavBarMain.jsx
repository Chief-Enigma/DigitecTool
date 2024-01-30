import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./NavBarMain.css";

export const NavBarMain = () => {
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      setStickyClass("sticky-nav");
    }
  };

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
        <li className="Account" style={{ float: "right" }}>
          <NavLink to="account" className="NavElement">
            Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
