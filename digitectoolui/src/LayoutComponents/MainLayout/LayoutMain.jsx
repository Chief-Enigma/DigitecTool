import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarMain } from "../../NavBarComponents/NavBarMain/NavBarMain";
import "../DashboardLayout/DashboardLayoutMain.css";
import "../DashboardLayout/DashboardNavBarsMain.css"
import background from "../../Pictures/DigitecWallpaper.jpg"

export const LayoutMain = ({ children }) => {
  return (
    <>
      <NavBarMain />
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            filter: 'brightness(0.5)',
          }}
        ></div>
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};