import React from "react";
import { Navigate } from "react-router-dom";

export const AdminDashboard = (props) => {
  if (!props.adminloggedIn) {
    return <Navigate replace to="/Dashboard" />;
  }


  return <p>AdminDashboard</p>;
};
