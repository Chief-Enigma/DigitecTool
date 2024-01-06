import React from "react";

export const AdminUserRow = ({ user }) => {
  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td>{user.email}</td>
      <td>{user.userRole}</td>
      <td>Comming soon</td>
    </tr>
  );
};
