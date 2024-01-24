import React, { useState } from "react";

import { TickerHeader } from "./TicketsComponents/TicketHeader";
import { TicketTable } from "./TicketsComponents/TicketTable";
import { TicketEditorMain } from "./TicketsComponents/TicketEditorMain";

export const TicketsMain = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");
  const [TicketEditor, setTicketEditor] = useState(false);
  console.log(TicketEditor);

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };
  return TicketEditor ? (
    <div className="DashboardContendBox">
      <TicketEditorMain onOpenTicketEditor={setTicketEditor} />
    </div>
  ) : (
    <div className="DashboardContendBox">
      <TickerHeader
        onSearchChange={handleSearchChange}
        onOpenTicketEditor={setTicketEditor}
      />
      <TicketTable searchInput={searchInput} />
    </div>
  );
};
