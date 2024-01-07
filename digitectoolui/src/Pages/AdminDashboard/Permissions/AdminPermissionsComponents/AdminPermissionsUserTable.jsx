import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { AdminPermissionsUserRow } from "./AdminPermissionsUserRow";

export const AdminPermissionsUserTable = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Get.GetAllUsers();
        setUsers(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch users only once when the component mounts

  useEffect(() => {
    if (searchInput.trim() === "") {
      // If search input is empty, display all users
      sortAndSetUsers(users.slice()); // Create a new array to trigger re-render
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
  
      // Sort by role first
      const roleComparison = roleOrder[a.userRole] - roleOrder[b.userRole];
      if (roleComparison !== 0) {
        return roleComparison;
      }
  
      // If roles are the same, sort by personal number
      const personalNumberA = isNaN(a.personalNumber) ? 0 : Number(a.personalNumber);
      const personalNumberB = isNaN(b.personalNumber) ? 0 : Number(b.personalNumber);
  
      return personalNumberA - personalNumberB;
    });
  
    setUserSearchResults(sortedUsers);
  };

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
