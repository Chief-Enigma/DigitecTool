import React, { useState } from "react";
import { Link } from "react-router-dom";

export const TickerHeader = ({ onSearchChange }) => {
  const [addTicket, setAddTicket] = useState(false);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(inputValue);
  };
  const handleAddTicket = (event) => {
    setAddTicket(!addTicket);
  };
  return (
    <div>
      <h2>Tickets</h2>
      <p>Some text here</p>
      <div className="SearchbarContainer">
        <input
          className="Searchbar"
          type="text"
          placeholder="Tickettitel oder Nummer eingeben..."
          onChange={handleSearchInputChange}
        />
        <Link onClick={handleAddTicket} className="SearchBarButtonEnd">
          <span className="material-symbols-outlined">person_add</span>
        </Link>
      </div>
      <div className={`AddTicketContainer ${addTicket ? "open" : ""}`}>
        {/* <EmployeeAddMain /> */}
      </div>
    </div>
  );
};
