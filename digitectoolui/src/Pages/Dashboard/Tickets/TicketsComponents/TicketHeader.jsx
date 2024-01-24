import React from "react";
import { Link } from "react-router-dom";

export const TickerHeader = ({ onSearchChange, onOpenTicketEditor }) => {
  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    onSearchChange(inputValue);
  };
  const handleTicketEditor = () => {
    onOpenTicketEditor(true);
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
        <Link onClick={handleTicketEditor} className="SearchBarButtonEnd">
          <span className="material-symbols-outlined">post_add</span>
        </Link>
      </div>
    </div>
  );
};
