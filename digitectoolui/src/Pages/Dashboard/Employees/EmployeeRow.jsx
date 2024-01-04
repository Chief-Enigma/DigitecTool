import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeRow = (props) => {
  const handleEditEmployee = () => {
    props.setEditEmployeeData(props.employeeData.personalNumber);
    props.setEditActiv(true);
  };

  return (
    <tr className="EmployeeRow">
      <td>
        {props.employeeData.firstName} {props.employeeData.lastName}
      </td>
      <td>{props.employeeData.workerRole}</td>
      <td>Team: {props.employeeData.team}</td>
      <td>{props.employeeData.personalNumber}</td>
      <td>
        <Link onClick={handleEditEmployee} className="EmployeeLink">
          <span class="material-symbols-outlined">manage_accounts</span>
        </Link>
      </td>
    </tr>
  );
};
