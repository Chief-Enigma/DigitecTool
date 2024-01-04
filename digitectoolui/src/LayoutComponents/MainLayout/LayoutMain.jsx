import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarMain } from "../../NavBarComponents/NavBarMain/NavBarMain";
import "../DashboardLayout/DashboardLayoutMain.css";
import "../DashboardLayout/DashboardNavBarsMain.css"

export const LayoutMain = ({ children }) => {
  return (
    <>
      <NavBarMain />
      <Outlet />
    </>
  );
};
