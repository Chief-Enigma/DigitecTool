import React, { useState } from "react";
import { AddEmployee } from "./AddEmployee";

export const EditEmployee = (props) => {
  return props.newEmployee ? (
    <AddEmployee/>
  ) : (
    <div className="DashboardContendBox">
      <h1>Edit Employee Page {props.editEmployeeData}</h1>
    </div>
  );
};
