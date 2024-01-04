import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const DashboardNavBarMain = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming the user data is stored in localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const permissions = user ? user.permissions : [];

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
        {permissions.includes("changeshift") && (
          <li>
            <NavLink to="changeshift" className="DashboardNavElement">
              <span className="material-symbols-outlined">swap_horiz</span>
              Diensttausch
            </NavLink>
          </li>
        )}
        {permissions.includes("reportsick") && (
          <li>
            <NavLink to="reportsick" className="DashboardNavElement">
              <span className="material-symbols-outlined">coronavirus</span>
              Krankmelden
            </NavLink>
          </li>
        )}
        <li>
          {permissions.includes("requestholliday") && (
            <NavLink to="requestholliday" className="DashboardNavElement">
              <span className="material-symbols-outlined">beach_access</span>
              Abwesenheit beantragen
            </NavLink>
          )}
        </li>
        <li>
          {permissions.includes("createplan") && (
            <NavLink to="createplan" className="DashboardNavElement">
              <span className="material-symbols-outlined">calendar_add_on</span>
              Schichtplan erstellen
            </NavLink>
          )}
        </li>
        <li>
          {permissions.includes("editplan") && (
            <NavLink to="editplan" className="DashboardNavElement">
              <span className="material-symbols-outlined">edit_calendar</span>
              Schichtplan bearbeiten
            </NavLink>
          )}
        </li>

        <li>
          {permissions.includes("employees") ||
          permissions.includes("editemployees") ? (
            <NavLink to="employees" className="DashboardNavElement">
              <span className="material-symbols-outlined">groups</span>
              Mitarbeiter
            </NavLink>
          ) : null}
        </li>

        {permissions.includes("tickets") && (
          <li>
            <NavLink to="tickets" className="DashboardNavElement">
              <span className="material-symbols-outlined">receipt_long</span>
              Tickets
            </NavLink>
          </li>
        )}
        <li>
          {permissions.includes("maintenance") && (
            <NavLink to="maintenance" className="DashboardNavElement">
              <span className="material-symbols-outlined">
                home_repair_service
              </span>
              Wartung
            </NavLink>
          )}
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
