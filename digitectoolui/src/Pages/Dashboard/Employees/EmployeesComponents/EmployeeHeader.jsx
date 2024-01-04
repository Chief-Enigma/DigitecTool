import React from "react";
import { Link } from "react-router-dom";

export const EmployeeHeader = ({ onSearchChange }) => {
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(inputValue);
  };
  const handleAddEmployee = (event) => {};

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
        <Link onClick={handleAddEmployee} className="AddEmployeeLink">
          <span className="material-symbols-outlined">person_add</span>
        </Link>
      </div>
    </div>
  );
};
