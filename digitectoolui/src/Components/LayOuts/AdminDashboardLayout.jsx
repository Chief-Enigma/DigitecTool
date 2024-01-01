import React from "react";
import { Outlet } from "react-router-dom";
import { AdminDashboardNavBar } from "../AdminDashboard/AdminDashboardNavBar";

import { Navigate } from "react-router-dom";

import "../Dashboard/DashboardNavBar.css";

export const AdminDashboardLayout = (props) => {
  const { userrole } = props;
  if (userrole != "Admin") {
    return <Navigate replace to="/LogIn" />;
  }
  return (
    <div className="dashboard-container">
      <div className="nav-container">
        <AdminDashboardNavBar />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
