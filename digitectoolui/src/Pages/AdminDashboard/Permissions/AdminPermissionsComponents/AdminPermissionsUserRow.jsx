import React, { useState } from "react";
//import { Link } from "react-router-dom";
import Put from "../../../../Functions/Api/Requests/Put";

export const AdminPermissionsUserRow = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);

  const removePermission = (permissionToRemove) => {
    const updatedPermissions = permissions.filter(
      (permission) => permission !== permissionToRemove
    );
    setPermissions(updatedPermissions);

    // Hier rufst du die EditLoginCredentials-Funktion auf, um die Änderungen ans Backend zu senden
    const data = {
      Type: "Permissions",
      Payload: JSON.stringify(updatedPermissions), // Umwandlung in einen JSON-String
    };
    const personalnumber = user.personalNumber; // Oder hole die personalNumber von deinem Benutzerobjekt
    Put.EditLoginCredentials(data, personalnumber);
  };

  const permissionObject = permissions.map((permission) => (
    <label key={permission} className="PermissionBox">
      <span className="PermissionText">{permission}</span>
      <span
        className="material-symbols-outlined"
        onClick={() => removePermission(permission)}
      >
        close
      </span>
    </label>
  ));

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
