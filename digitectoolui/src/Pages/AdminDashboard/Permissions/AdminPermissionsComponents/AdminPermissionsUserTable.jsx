import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { AdminPermissionsUserRow } from "./AdminPermissionsUserRow";

export const AdminPermissionsUserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const userSearchResults = [];
  const userRows = [];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await Get.GetAllUsers();
        setUsers(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getUsers();
  }, []);

  users.forEach((user) => {
    userRows.push(
      <AdminPermissionsUserRow key={user.personalNumber} user={user} />
    );
  });

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
          {userRows}
        </tbody>
      </table>
    </div>
  );
};
