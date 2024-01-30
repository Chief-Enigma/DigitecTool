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
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

        <div style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          height: '100%',
          position: 'absolute',
          width: '100%',
          filter: 'brightness(0.5)',
          backgroundAttachment: 'fixed', // Dieses Attribut fügt das Hintergrundbild an
          zIndex: -1 // Hintergrundbild unter anderen Elementen platzieren
        }}></div>
        <Outlet />
      </div>
    </>
  );
};
