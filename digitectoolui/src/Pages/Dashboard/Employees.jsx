import React, { useState } from "react";
import "./Employees/Employees.css";

import { EmployeeRow } from "./Employees/EmployeeRow";

export const Employees = (props) => {
  const [searchBar, setSearchBar] = useState("");

  const handleSearch = async (e) => {
    setSearchBar(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="DashboardContendBox">
      <h2>Mitarbeiterverzeichniss</h2>
      <p>Some text here</p>
      <input
        className="Searchbar"
        type="text"
        placeholder="Name oder Personalnummer eingeben..."
        value={searchBar}
        onChange={handleSearch}
      />
      <br />
      <table className="EmployeeTable">
        <tr className="EmployeeRow" >
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Funktion</th>
          <th>Team</th>
          <th>Personalnummer</th>
          <th>Edit</th>
        </tr>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>
        <EmployeeRow personalnumber={props.personalnumber}/>

      </table>
    </div>
  );
};
