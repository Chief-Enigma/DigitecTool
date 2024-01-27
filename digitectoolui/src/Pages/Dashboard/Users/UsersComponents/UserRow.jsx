import React from "react";

export const UserRow = ({ user }) => {
  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td className="users-email">{user.email}</td>
      <td>{user.userRole}</td>
      <td className="non-mobile">Comming soon</td>
    </tr>
  );
};
