import React, { useEffect, useState } from "react";

import { TickerHeader } from "./TicketsComponents/TicketHeader";
import { TicketTable } from "./TicketsComponents/TicketTable";
import { TicketEditorMain } from "./TicketsComponents/TicketEditorMain";

import "./TicketsComponents/TicketMainStyle.css";

export const TicketsMain = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");
  const [ticketEditor, setTicketEditor] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  useEffect(() => {
    if (ticketNumber && !ticketEditor) {
      setTicketEditor(true);
      console.log("TicketEditor set to true");
    }
  }, [ticketNumber]);

  useEffect(() => {
    if (!ticketEditor && ticketNumber) {
      setTicketNumber("");
      console.log("TicketNumber reseted");
    }
  }, [ticketEditor]);

  return ticketEditor ? (
    <div className="DashboardContendBox">
      <TicketEditorMain
        onCloseTicketEditor={setTicketEditor}
        ticketNumberEditor={ticketNumber}
        user={user}
      />
    </div>
  ) : (
    <div className="DashboardContendBox">
      <TickerHeader
        onSearchChange={handleSearchChange}
        onOpenTicketEditor={setTicketEditor}
      />
      <TicketTable
        searchInput={searchInput}
        ticketNumberToEdit={setTicketNumber}
      />
    </div>
  );
};
