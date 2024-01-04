import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EmployeeRow } from "./EmployeeRow";
import ClientApi from "../../../Api/ClientApi";

export const EmployeesTable = (props) => {
  const [searchBar, setSearchBar] = useState("");
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const result = await ClientApi.GetAllEmployees();
      setEmployees(result);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const employeeSearchResults = [];
  const employeeRows = [];

  const handleSearch = async (e) => {
    setSearchBar(e.target.value);
    // console.log(e.target.value);
  };

  const handleAddEmployee = () => {
    props.setEditActiv(true);
    props.setNewEmployee(true);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  employees.forEach((employee) => {
    employeeRows.push(
      <EmployeeRow
        employeeData={employee}
        setEditActiv={props.setEditActiv}
        setEditEmployeeData={props.setEditEmployeeData}
      />
    );
  });

  return (
    <div className="DashboardContendBox">
      <h2>Mitarbeiterverzeichniss</h2>
      <p>Some text here</p>
      <div className="SearchbarContainer">
        <input
          className="Searchbar"
          type="text"
          placeholder="Name oder Personalnummer eingeben..."
          value={searchBar}
          onChange={handleSearch}
        />
        <Link onClick={handleAddEmployee} className="AddEmployeeLink">
          <span className="material-symbols-outlined">person_add</span>
        </Link>
      </div>
      <table className="EmployeeTable">
        <tr className="EmployeeRow EmployeeTitleRow">
          <td>Name</td>
          <td>Funktion</td>
          <td>Team</td>
          <td>Personalnummer</td>
          <td></td>
        </tr>
        {employeeRows}
      </table>
    </div>
  );
};
