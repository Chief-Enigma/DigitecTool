import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeRow } from "./EmployeeRow";

const employees = [
  {
    personalnumber: "1",
    team: "Eren",
    workerrole: "MT",
    firstname: "Ivan",
    lastname: "IvanIvan",
    email: "",
    phonenumber: "",
  },
  {
    personalnumber: "2",
    team: "Eren",
    workerrole: "JT",
    firstname: "Dragan",
    lastname: "DraganDragan",
    email: "",
    phonenumber: "",
  },
  {
    personalnumber: "3",
    team: "Eren",
    workerrole: "JT",
    firstname: "Sali",
    lastname: "SaliSali",
    email: "",
    phonenumber: "",
  },
  {
    personalnumber: "4",
    team: "Zeljko",
    workerrole: "MT",
    firstname: "Julian",
    lastname: "Bambauer",
    email: "",
    phonenumber: "",
  },
  {
    personalnumber: "5",
    team: "Zeljko",
    workerrole: "JT",
    firstname: "Anto",
    lastname: "AntoAnto",
    email: "",
    phonenumber: "",
  },
];

export const EmployeesTable = (props) => {
  const [searchBar, setSearchBar] = useState("");

  const employeeRows = [];
  const employeeSearchResults = [];

  const handleSearch = async (e) => {
    setSearchBar(e.target.value);
    console.log(e.target.value);
  };

  const handleAddEmployee = () => {
    props.setEditActiv(true);
    props.setNewEmployee(true);
  };

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
          <span class="material-symbols-outlined">person_add</span>
        </Link>
      </div>
      <br />
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
