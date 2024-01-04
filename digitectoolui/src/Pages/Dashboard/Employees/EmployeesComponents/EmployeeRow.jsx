import React from "react";
import { Link } from "react-router-dom";

export const EmployeeRow = ({ employee }) => {
  return (
    <tr className="EmployeeRow">
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      <td>{employee.workerRole}</td>
      <td>Team: {employee.team}</td>
      <td>{employee.personalNumber}</td>
      <td>
        <Link className="EmployeeLink">
          <span class="material-symbols-outlined">manage_accounts</span>
        </Link>
      </td>
    </tr>
  );
};
