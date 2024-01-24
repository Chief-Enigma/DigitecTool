import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { TicketRow } from "./TicketRow";

export const TicketTable = ({ searchInput }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketsSearchResults, setTicketsSearchResults] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const result = await Get.GetAllTickets("open");
        setTickets(result);
        console.log(result);
      } catch (error) {
        console.error("Error getting tickets:", error);
      }
    };
    getTickets();
  }, []);

  const toggleRow = (ticketNumber) => {
    const newExpandedRows = [...expandedRows];
    const index = newExpandedRows.indexOf(ticketNumber);
    if (index !== -1) {
      newExpandedRows.splice(index, 1);
    } else {
      newExpandedRows.push(ticketNumber);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td>Ticket Nr.</td>
            <td>Datum</td>
            <td>Bereich</td>
            <td>AKZ</td>
            <td>Erstellt von</td>
            <td></td>
          </tr>
          {tickets.map((ticket) => (
            <TicketRow
              key={ticket.ticketNumber}
              ticket={ticket}
              expanded={expandedRows.includes(ticket.ticketNumber)}
              toggleRow={toggleRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
