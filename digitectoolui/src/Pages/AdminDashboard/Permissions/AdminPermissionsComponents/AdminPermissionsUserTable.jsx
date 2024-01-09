import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { AdminPermissionsUserRow } from "./AdminPermissionsUserRow";

export const AdminPermissionsUserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const avaliblePermissions = [
    "changeshift",
    "reportsick",
    "requestholliday",
    "createplan",
    "editplan",
    "employees",
    "editemployees",
    "tickets",
    "maintenance",
  ];

  const permissionList = [];
  avaliblePermissions.forEach((permission) => {
    permissionList.push(
      <label key={permission} className="PermissionBox">
        <span className="PermissionText">{permission}</span>
      </label>
    );
  });

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
        {permissionList}
      </div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td>Personal Nr.</td>
            <td>Email</td>
            <td>Benutzertyp</td>
            <td>Berechtigungen</td>
          </tr>
          {userSearchResults.map((user) => (
            <AdminPermissionsUserRow key={user.personalNumber} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
