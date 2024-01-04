import React from "react";
import { NavLink } from "react-router-dom";

export const DashboardNavBarMain = () => {
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
          <NavLink to="changeshift" className="DashboardNavElement">
            <span class="material-symbols-outlined">swap_horiz</span>
            Diensttausch
          </NavLink>
        </li>
        <li>
          <NavLink to="reportsick" className="DashboardNavElement">
            <span class="material-symbols-outlined">coronavirus</span>
            Krankmelden
          </NavLink>
        </li>
        <li>
          <NavLink to="requestholliday" className="DashboardNavElement">
            <span class="material-symbols-outlined">beach_access</span>
            Abwesenheit beantragen
          </NavLink>
        </li>
        <li>
          <NavLink to="createplan" className="DashboardNavElement">
            <span class="material-symbols-outlined">calendar_add_on</span>
            Schichtplan erstellen
          </NavLink>
        </li>
        <li>
          <NavLink to="editplan" className="DashboardNavElement">
            <span className="material-symbols-outlined">edit_calendar</span>
            Schichtplan bearbeiten
          </NavLink>
        </li>
        <li>
          <NavLink to="employees" className="DashboardNavElement">
            <span className="material-symbols-outlined">groups</span>Mitarbeiter
          </NavLink>
        </li>
        <li>
          <NavLink to="tickets" className="DashboardNavElement">
            <span className="material-symbols-outlined">receipt_long</span>
            Tickets
          </NavLink>
        </li>
        <li>
          <NavLink to="maintenance" className="DashboardNavElement">
            <span class="material-symbols-outlined">home_repair_service</span>
            Wartung
          </NavLink>
        </li>
        <li>
          <NavLink to="settings" className="DashboardNavElement">
            <span className="material-symbols-outlined">settings</span>
            Einstellungen
          </NavLink>
        </li>
        <li>
          <NavLink to="help" className="DashboardNavElement">
            <span class="material-symbols-outlined">lightbulb</span>
            Hilfe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
