import React from "react";
//import { Link } from "react-router-dom";

export const AdminPermissionsUserRow = ({ user }) => {
  const permissionObject = [];
  user.permissions.forEach((permission) => {
    permissionObject.push(
      <label key={permission} className="PermissionBox">
        <span className="PermissionText">{permission}</span>
        <span className="material-symbols-outlined">close</span>
      </label>
    );
  });

  const getRoleColor = (role) => {
    switch (role) {
      case "user":
        return "#0acf03c7";
      case "admin":
        return "#faae0ac7";
      case "sysadmin":
        return "#fa260ac7";
      default:
        return "white"; // Default color or any other color you want
    }
  };

  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td>{user.email}</td>
      <td>
        <label
          className="RoleLabel"
          style={{ backgroundColor: getRoleColor(user.userRole) }}
        >
          <span>{user.userRole}</span>
        </label>
      </td>
      <td>{permissionObject}</td>
    </tr>
  );
};
