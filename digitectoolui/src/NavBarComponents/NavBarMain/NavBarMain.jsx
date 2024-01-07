import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./NavBarMain.css";

export const NavBarMain = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userRole = user ? user.userrole : null;

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
        {(userRole === "admin" || userRole === "sysadmin") && (
          <li>
            <NavLink to="admindashboard" className="NavElement">
              Admin Dashboard
            </NavLink>
          </li>
        )}
        <li style={{ float: "right" }}>
          <NavLink to="account" className="NavElement">
            Account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
