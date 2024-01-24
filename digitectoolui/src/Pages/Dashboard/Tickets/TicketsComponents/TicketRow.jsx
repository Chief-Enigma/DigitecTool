import React, { useState } from "react";
import { Link } from "react-router-dom";
import Get from "../../../../Functions/Api/Requests/Get";

export const TicketRow = ({ ticket, expanded, toggleRow }) => {
  const [ticketText, setTicketText] = useState("");

  const getTicketText = async () => {
    const response = await Get.GetTicketText(ticket.ticketNumber);
    setTicketText(response.ticketText);
  };

  return (
    <>
      <tr className={`EmployeeRow ${expanded ? "open" : ""}`}>
        <td>{ticket.ticketNumber}</td>
        <td>{ticket.creationDate}</td>
        <td>{ticket.location}</td>
        <td>{ticket.akz}</td>
        <td>{ticket.createdBy}</td>
        <td>
          <Link
            className="EmployeeLink"
            onClick={() => {
              toggleRow(ticket.ticketNumber);
              getTicketText();
            }}
          >
            <span className="toggleicon material-symbols-outlined">expand_more</span>
          </Link>
        </td>
      </tr>
      {expanded && (
        <tr className="ExpandedRow">
          <td colSpan="6">
            <div className={`TicketDataContainer ${expanded ? "open" : ""}`}>
              <textarea
                readOnly
                
                value={ticketText}
                style={{ width: "100%", height: "100px", resize:'none' }}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
