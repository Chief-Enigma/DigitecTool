import React from "react";

export const UserHeader = ({ onSearchChange }) => {
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(inputValue);
  };

  return (
    <div>
      <h2>Benutzerverzeichniss</h2>
      <div className="SearchbarContainer">
        <input
          className="Searchbar"
          type="text"
          placeholder="Email oder Personalnummer eingeben..."
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
};
