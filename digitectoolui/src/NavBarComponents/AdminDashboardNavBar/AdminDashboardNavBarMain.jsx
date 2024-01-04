import React from "react";
import { NavLink } from "react-router-dom";

export const AdminDashboardNavBarMain = () => {
  return (
    <nav className="DashboardNavBar">
      <ul>
        <li>
          <NavLink
            to="today"
            activeClassName="active"
            className="DashboardNavElement"
          >
            <span className="material-symbols-outlined">event</span>Today
          </NavLink>
        </li>
        <li>
          <NavLink to="employees" className="DashboardNavElement">
            <span className="material-symbols-outlined">groups</span>Mitarbeiter
          </NavLink>
        </li>
        <li>
          <NavLink to="users" className="DashboardNavElement">
            <span class="material-symbols-outlined">group</span>
            Benutzer
          </NavLink>
        </li>
        <li>
          <NavLink to="permissions" className="DashboardNavElement">
            <span class="material-symbols-outlined">admin_panel_settings</span>
            Berechtigungen
          </NavLink>
        </li>
        <li>
          <NavLink to="settings" className="DashboardNavElement">
            <span className="material-symbols-outlined">settings</span>
            Einstellungen
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
