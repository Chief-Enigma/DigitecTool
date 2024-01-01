import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const EditEmployee = (props) => {
  return props.newEmployee ? (
    <div className="DashboardContendBox">
      <h1>Add Employee Page</h1>
    </div>
  ) : (
    <div className="DashboardContendBox">
      <h1>Edit Employee Page {props.editEmployeeData}</h1>
    </div>
  );
};
