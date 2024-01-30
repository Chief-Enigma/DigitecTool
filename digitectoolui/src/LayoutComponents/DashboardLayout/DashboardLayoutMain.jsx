import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavBarMain } from "../../NavBarComponents/DashboardNavBarMain/DashboardNavBarMain";

export const DashboardLayoutMain = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-navbar">
        <DashboardNavBarMain />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};
