import React, { useState } from "react";
import Put from "../../../../Functions/Api/Requests/Put";

export const AdminPermissionsUserRow = ({ user, selectedPermission, setSelectedPermission }) => {
  const [permissions, setPermissions] = useState(user.permissions);

  const removePermission = (permissionToRemove) => {
    const updatedPermissions = permissions.filter(
      (permission) => permission !== permissionToRemove
    );
    setPermissions(updatedPermissions);

    const data = {
      Type: "Permissions",
      Payload: JSON.stringify(updatedPermissions),
    };
    const personalnumber = user.personalNumber;
    Put.EditLoginCredentials(data, personalnumber);
  };

  const addPermission = () => {
    if (selectedPermission && !permissions.includes(selectedPermission)) {
      const updatedPermissions = [...permissions, selectedPermission];
      setPermissions(updatedPermissions);
      setSelectedPermission(null)

      const data = {
        Type: "Permissions",
        Payload: JSON.stringify(updatedPermissions),
      };
      const personalnumber = user.personalNumber;
      Put.EditLoginCredentials(data, personalnumber);
    }
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
    <tr className="EmployeeRow" onClick={addPermission}>
      <td>{user.personalNumber}</td>
      <td ><span className="UserEmail">{user.email}</span></td>
      <td>
        <label
          className="RoleLabel"
          style={{
            backgroundColor: `rgba(${getRoleColor(user.userRole)}, 0.3)`,
            borderColor: `rgba(${getRoleColor(user.userRole)}, 1)`,
          }}
        >
          <span>{user.userRole}</span>
        </label>
      </td>
      <td>{permissionObject}</td>
    </tr>
  );
};
