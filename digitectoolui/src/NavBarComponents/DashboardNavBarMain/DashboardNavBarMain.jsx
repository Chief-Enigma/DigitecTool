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
  const userRole = user ? user.userrole : null;

  return (
    <nav className="DashboardNavBar">
      <ul>
        <li>
          <NavLink
            to="today"
            activeclassame="active"
            className="DashboardNavElement"
          >
            <span className="material-symbols-outlined">event</span>
            <span className="DashboardNavBarText">Today</span>
          </NavLink>
        </li>
        {userRole === "sysadmin" || permissions.includes("changeshift") ? (
          <li>
            <NavLink to="changeshift" className="DashboardNavElement">
              <span className="material-symbols-outlined">swap_horiz</span>
              <span className="DashboardNavBarText">Diensttausch</span>
            </NavLink>
          </li>
        ) : null}
        {userRole === "sysadmin" || permissions.includes("reportsick") ? (
          <li>
            <NavLink to="reportsick" className="DashboardNavElement">
              <span className="material-symbols-outlined">coronavirus</span>
              <span className="DashboardNavBarText">Krankmelden</span>
            </NavLink>
          </li>
        ) : null}

        {userRole === "sysadmin" || permissions.includes("requestholliday") ? (
          <li>
            <NavLink to="requestholliday" className="DashboardNavElement">
              <span className="material-symbols-outlined">beach_access</span>

              <span className="DashboardNavBarText">
                Abwesenheit beantragen
              </span>
            </NavLink>
          </li>
        ) : null}

        {/* {userRole === "sysadmin" || permissions.includes("createplan") ? (
          <li>
            <NavLink to="createplan" className="DashboardNavElement">
              <span className="material-symbols-outlined">calendar_add_on</span>
              Schichtplan erstellen
            </NavLink>
          </li>
        ) : null} */}
        {userRole === "sysadmin" || permissions.includes("editplan") ? (
          <li>
            <NavLink to="editplan" className="DashboardNavElement">
              <span className="material-symbols-outlined">edit_calendar</span>
              <span className="DashboardNavBarText">
                Schichtplan bearbeiten
              </span>
            </NavLink>
          </li>
        ) : null}

        {userRole === "sysadmin" ||
        permissions.includes("employees") ||
        permissions.includes("editemployees") ? (
          <li>
            <NavLink to="employees" className="DashboardNavElement">
              <span className="material-symbols-outlined">groups</span>
              <span className="DashboardNavBarText">Mitarbeiter</span>
            </NavLink>
          </li>
        ) : null}

        {userRole === "sysadmin" || permissions.includes("tickets") ? (
          <li>
            <NavLink to="tickets" className="DashboardNavElement">
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="DashboardNavBarText">Tickets</span>
            </NavLink>
          </li>
        ) : null}
        {userRole === "sysadmin" || permissions.includes("maintenance") ? (
          <li>
            <NavLink to="maintenance" className="DashboardNavElement">
              <span className="material-symbols-outlined">
                home_repair_service
              </span>
              <span className="DashboardNavBarText">Wartung</span>
            </NavLink>
          </li>
        ) : null}

        <li>
          <NavLink to="settings" className="DashboardNavElement">
            <span className="material-symbols-outlined">settings</span>
            <span className="DashboardNavBarText">Einstellungen</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="help" className="DashboardNavElement">
            <span className="material-symbols-outlined">lightbulb</span>
            <span className="DashboardNavBarText">Hilfe</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
