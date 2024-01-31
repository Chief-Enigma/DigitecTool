import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarMain } from "../../NavBarComponents/NavBarMain/NavBarMain";
import "../DashboardLayout/DashboardLayoutMain.css";
import "../DashboardLayout/DashboardNavBarsMain.css"
import "./LayOutMain.css"

export const LayoutMain = ({ children }) => {
  return (
    <>
      <NavBarMain />
      <div className="LayOutContent">
        <div className="LayOutBackGround"
        ></div>
        <div className="LayOutOutlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};