import React, { useState } from "react";
import { Link } from "react-router-dom";

import { EmployeeAddMain } from "./EmployeeAddMain";

export const EmployeeHeader = ({ onSearchChange }) => {
  const [addEmployee, setAddEmployee] = useState(false);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(inputValue);
  };
  const handleAddEmployee = () => {
    setAddEmployee(!addEmployee);
  };
  return (
    <div>
      <h2>Mitarbeiterverzeichniss</h2>
      <p>Some text here</p>
      <div className="SearchbarContainer">
        <input
          className="Searchbar"
          type="text"
          placeholder="Name oder Personalnummer eingeben..."
          onChange={handleSearchInputChange}
        />
        <Link onClick={handleAddEmployee} className="SearchBarButtonEnd">
          <span className="material-symbols-outlined">person_add</span>
        </Link>
      </div>
      <div className={`AddEmployeeContainer ${addEmployee ? "open" : ""}`}>
        <EmployeeAddMain />
      </div>
    </div>
  );
};
