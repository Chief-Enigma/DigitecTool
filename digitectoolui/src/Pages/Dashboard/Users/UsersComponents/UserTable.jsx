import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { UserRow } from "./UserRow";

export const UserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  //const userSearchResults = [];
  const userRows = [];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await Get.GetAllUsers();
        setUsers(result);
        console.log(result);
      } catch (error) {
        console.error("Error getUsers: ", error);
      }
    };
    getUsers();
  }, []);

  users.forEach((user) => {
    userRows.push(<UserRow key={user.email} user={user} />);
  });

  return (
    <div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td>Personal Nr.</td>
            <td>Email</td>
            <td>Benutzertyp</td>
            <td className="non-mobile">Comming soon</td>
          </tr>
          {userRows}
        </tbody>
      </table>
    </div>
  );
};
