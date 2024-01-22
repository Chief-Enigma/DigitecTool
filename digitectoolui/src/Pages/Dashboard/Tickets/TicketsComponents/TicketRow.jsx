import React from "react";
import { Link } from "react-router-dom";


export const TicketRow = ({ ticket, expanded, toggleRow }) => {
  return (
    <>
      <tr className={`EmployeeRow ${expanded ? "open" : ""}`}>
        <td>{ticket.ticketNumber}</td>
        <td>{ticket.creationDate}</td>
        <td>{ticket.location}</td>
        <td>{ticket.akz}</td>
        <td>{ticket.createdBy}</td>
        <td></td>
      </tr>
      {true && (
        <tr>
          <td colSpan="6">{ticket.ticketText}</td>
        </tr>
      )}
    </>
  );
};
