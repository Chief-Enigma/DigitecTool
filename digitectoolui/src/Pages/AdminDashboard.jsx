import React from "react";
import { Navigate } from "react-router-dom";

export const AdminDashboard = (props) => {
  if (!props.adminloggedIn) {
    return <Navigate replace to="/Login" />;
  }


  return <p>AdminDashboard</p>;
};
