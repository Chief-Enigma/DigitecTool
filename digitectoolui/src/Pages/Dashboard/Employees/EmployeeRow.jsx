import React, { useState } from "react";
import { Link } from "react-router-dom";

export const EmployeeRow = (props) => {
  const handleEditEmployee = () => {
    props.setEditEmployeeData(props.employeeData.personalnumber);
    props.setEditActiv(true);
  };

  return (
    <tr className="EmployeeRow">
      <td>
        {props.employeeData.firstname} {props.employeeData.lastname}
      </td>
      <td>{props.employeeData.workerrole}</td>
      <td>Team: {props.employeeData.team}</td>
      <td>{props.employeeData.personalnumber}</td>
      <td>
        <Link onClick={handleEditEmployee} className="EmployeeLink">
          <span class="material-symbols-outlined">manage_accounts</span>
        </Link>
      </td>
    </tr>
  );
};
