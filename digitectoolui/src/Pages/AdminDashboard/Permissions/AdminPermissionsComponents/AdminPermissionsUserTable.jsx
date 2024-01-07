import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { AdminPermissionsUserRow } from "./AdminPermissionsUserRow";

export const AdminPermissionsUserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await Get.GetAllUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setUserSearchResults(users);
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

    const sortedUsers = filteredUsers.sort((a, b) => {
      const roleOrder = { sysadmin: 0, admin: 1, user: 2 };
      return roleOrder[a.userRole] - roleOrder[b.userRole];
    });

    setUserSearchResults(sortedUsers);
  }, [searchInput, users]);

  return (
    <div>
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
