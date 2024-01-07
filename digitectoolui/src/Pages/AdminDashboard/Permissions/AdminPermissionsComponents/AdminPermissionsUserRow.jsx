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
        return "10, 207, 3"; // Green
      case "admin":
        return "250, 174, 10"; // Orange
      case "sysadmin":
        return "250, 38, 10"; // Red
      case "manager":
        return "10, 76, 250"; // Blue (suggestion)
      default:
        return "255, 255, 255"; // Default color or any other color you want
    }
  };

  return (
    <tr className="EmployeeRow">
      <td>{user.personalNumber}</td>
      <td>{user.email}</td>
      <td>
        <label
          className="RoleLabel"
          style={{
            backgroundColor: `rgba(${getRoleColor(user.userRole)}, 0.3)`, // Adding the '0.3' for opacity
            borderColor: `rgba(${getRoleColor(user.userRole)}, 1)`, // No opacity for borderColor
          }}
        >
          <span>{user.userRole}</span>
        </label>
      </td>
      <td>{permissionObject}</td>
    </tr>
  );
};
