import React from "react";
import { Link } from "react-router-dom";

export const AdminPermissionsUserRow = ({ user }) => {
  const permissionObject = [];
  user.permissions.forEach((permission) => {
    permissionObject.push(
      <label className="PermissionBox">
        {permission}
        <span class="material-symbols-outlined">close</span>
      </label>
    );
  });

  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td>{user.email}</td>
      <td>{user.userRole}</td>
      <td>{permissionObject}</td>
    </tr>
  );
};
