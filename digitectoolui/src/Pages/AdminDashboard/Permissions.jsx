import React, { useState, useEffect } from "react";
import ClientApi from "../../Api/ClientApi";
import { UserRow } from "./Permissions/UserRow";
import "./Permissions/Permissions.css"

export const Permissions = (props) => {


  // const permissions = ["moin", "edit", "test"];

  // const handlePermissionEdit = async () => {
  //   const result = await ClientApi.EditLoginCredentials({ type: "Permissions", payload: JSON.stringify(permissions) }, 420420);
  // }

  const [searchBar, setSearchBar] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await ClientApi.GetAllUsers();
      setUsers(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const userSearchResults = [];
  const userRows = [];

  const handleSearch = async (e) => {
    setSearchBar(e.target.value);
    // console.log(e.target.value);
  };

  useEffect(() => {
    getUsers();
  }, []);


  users.forEach((user) => {
    userRows.push(
      <UserRow
        userData={user}
      />
    );
  });


  return (
    <div className="DashboardContendBox">
      <h2>User Berechtigungen</h2>
      <p>Some text here</p>
      <div className="SearchbarContainer">
        <input
          className="Searchbar"
          type="text"
          placeholder="Name oder Personalnummer eingeben..."
          value={searchBar}
          onChange={handleSearch}
        />
      </div>
      <table className="EmployeeTable">
        <tr className="EmployeeRow EmployeeTitleRow">
          <td>Email</td>
          <td>Personalnummer</td>
          <td>Benutzertyp</td>
          <td>Berechtigungen</td>
        </tr>
        {userRows}
      </table>
    </div>
  );
};
