import React from "react";
import { Outlet } from "react-router-dom";
import { AdminDashboardNavBarMain } from "../../NavBarComponents/AdminDashboardNavBar/AdminDashboardNavBarMain";

export const AdminDashboardLayoutMain = () => {
  return (
    <div className="dashboard-container">
      <div className="nav-container">
        <AdminDashboardNavBarMain />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
