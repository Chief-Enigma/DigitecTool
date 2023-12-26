import React from "react";
import { Navigate } from "react-router-dom";

export const Dashboard = (props) => {
  if (!props.loggedIn) {
    return <Navigate replace to="/LogIn" />;
  }
  
  return <p>Dashboard</p>;
};
