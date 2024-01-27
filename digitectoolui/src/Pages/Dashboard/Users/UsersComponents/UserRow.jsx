import React from "react";

export const UserRow = ({ user }) => {
  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td>{user.email}</td>
      <td>{user.userRole}</td>
      <td>Comming soon</td>
    </tr>
  );
};
