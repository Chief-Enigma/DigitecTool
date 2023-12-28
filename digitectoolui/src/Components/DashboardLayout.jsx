import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "./Dashboard/DashboardNavBar"

import { Navigate } from "react-router-dom";

import "./Dashboard/Dashboard.css"

export const DashboardLayout = (props) => {
    if (!props.loggedIn) {
        return <Navigate replace to="/LogIn" />;
    }
    return (
        <div className="dashboard-container">
            <div className="nav-container">
                <DashboardNavBar />
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
};
