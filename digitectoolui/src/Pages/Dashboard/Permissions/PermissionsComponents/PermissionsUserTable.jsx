import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { PermissionsUserRow } from "./PermissionsUserRow";

export const PermissionsUserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const avaliblePermissions = [
    "editplan",
    "manageemployees",
    "tickets",
    "managetickets",
    "maintenance",
    "approverequests"
  ];

  const handlePermissionTypeClick = (permission) => {
    setSelectedPermission(permission);
    console.log("Selected Permission: " + permission);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await Get.GetAllUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error getUsers for permissions:", error);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      sortAndSetUsers(users.slice());
      return;
    }

    const filteredUsers = users.filter((user) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();

      if (
        !isNaN(searchInput) &&
        user.personalNumber.toString().startsWith(searchInput)
      ) {
        return true;
      }
      return user.email.toLowerCase().startsWith(lowerCaseSearchInput);
    });

    sortAndSetUsers(filteredUsers);
  }, [searchInput, users]);

  const sortAndSetUsers = (userArray) => {
    const sortedUsers = userArray.sort((a, b) => {
      const roleOrder = { sysadmin: 0, admin: 1, manager: 2, user: 3 };

      const roleComparison = roleOrder[a.userRole] - roleOrder[b.userRole];
      if (roleComparison !== 0) {
        return roleComparison;
      }

      const personalNumberA = isNaN(a.personalNumber)
        ? 0
        : Number(a.personalNumber);
      const personalNumberB = isNaN(b.personalNumber)
        ? 0
        : Number(b.personalNumber);

      return personalNumberA - personalNumberB;
    });

    setUserSearchResults(sortedUsers);
  };

  return (
    <div>
      <br />
      <div>
        <p>Verfügbare Berechtigungen</p>
        {avaliblePermissions.map((permission) => (
          <label
            key={permission}
            className={`PermissionBox ${
              selectedPermission === permission ? "SelectedPermissionBox" : ""
            }`}
            onClick={() => handlePermissionTypeClick(permission)}
          >
            <span className="PermissionText">{permission}</span>
          </label>
        ))}
      </div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td className="non-mobile">Personal Nr.</td>
            <td className="on-mobile">Nr.</td>
            <td className="non-mobile">Email</td>
            <td>Benutzertyp</td>
            <td>Berechtigungen</td>
          </tr>
          {userSearchResults.map((user) => (
            <PermissionsUserRow
              key={user.email}
              user={user}
              selectedPermission={selectedPermission}
              setSelectedPermission={setSelectedPermission}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
