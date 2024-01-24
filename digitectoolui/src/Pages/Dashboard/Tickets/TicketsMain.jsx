import React, { useState } from "react";

import { TickerHeader } from "./TicketsComponents/TicketHeader";
import { TicketTable } from "./TicketsComponents/TicketTable";

export const TicketsMain = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };
  return (
    <div className="DashboardContendBox">
      <TickerHeader onSearchChange={handleSearchChange} />
      <TicketTable searchInput={searchInput} />
    </div>
  );
};
