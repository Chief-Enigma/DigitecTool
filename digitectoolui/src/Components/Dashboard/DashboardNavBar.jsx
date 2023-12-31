import React from "react";
import { Link } from "react-router-dom";
import "./DashboardNavBar.css";

export const DashboardNavBar = (props) => {
  return (
    <nav className="DashboardNavBar">
      <ul>
        <li>
          <Link to="main">
            <a className="DashboardNavElement">
              <span class="material-symbols-outlined">event</span>Today
            </a>
          </Link>
        </li>
        <li>
          <Link to="main">
            <a className="DashboardNavElement">
              <span class="material-symbols-outlined">edit_calendar</span>
              Schichtplan bearbeiten
            </a>
          </Link>
        </li>
        <li>
          <Link to="main">
            <a className="DashboardNavElement">
              <span class="material-symbols-outlined">groups</span>Mitarbeiter
            </a>
          </Link>
        </li>
        <li>
          <Link to="main">
            <a className="DashboardNavElement">
              <span class="material-symbols-outlined">receipt_long</span>Tickets
            </a>
          </Link>
        </li>
        <li>
          <Link to="main">
            <a className="DashboardNavElement">
              <span class="material-symbols-outlined">settings</span>
              Einstellungen
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
