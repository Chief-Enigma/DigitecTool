import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditEmployee } from "../EditEmployee";

import { Navigate } from "react-router-dom";

const handleEditUser = () => {
  return <EditEmployee />;
};

export const EmployeeRow = (props) => {
  return (
    <tr className="EmployeeRow">
      <td>Julian</td>
      <td>Bambauer</td>
      <td>Maintanance Technican</td>
      <td>Team: Sakac</td>
      <td>8168</td>
      <td>
        <Link to={`/Dashboard/employee/${props.personalnumber}`} className="EmployeeLink" >
          <span class="material-symbols-outlined">manage_accounts</span>
        </Link>
      </td>
    </tr>
  );
};
