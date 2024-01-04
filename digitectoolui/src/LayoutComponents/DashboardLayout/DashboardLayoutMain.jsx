import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavBarMain } from "../../NavBarComponents/DashboardNavBarMain/DashboardNavBarMain";

export const DashboardLayoutMain = () => {
  return (
    <div className="dashboard-container">
      <div className="nav-container">
        <DashboardNavBarMain />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};
