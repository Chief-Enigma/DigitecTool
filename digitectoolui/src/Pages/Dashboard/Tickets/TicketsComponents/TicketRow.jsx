import React from "react";
import { Link } from "react-router-dom";

import Delete from "../../../../Functions/Api/Requests/Delete";

export const TicketRow = ({
  ticket,
  expanded,
  toggleRow,
  ticketNumberToEdit,
  onDeleteButton
}) => {
  const formatCreationDate = () => {
    const creationDate = new Date(ticket.creationDate);
    const formattedDate = creationDate.toLocaleDateString();
    return formattedDate;
  };

  const formatLocation = () => {
    const locationString = ticket.ticketLocations.map((location) => (
      <span key={location} className="Locations">
        {location}
      </span>
    ));
    return locationString;
  };

  const getStateColor = (state) => {
    switch (state) {
      case "open":
        return "10, 207, 3";
      case "to plan":
        return "250, 174, 10";
      case "closed":
        return "250, 38, 10";
      case "planed":
        return "10, 76, 250";
      default:
        return "255, 255, 255";
    }
  };

  const generatePdf = (ticketnumber) => {
    console.log("PDF Button on Ticket: ", ticketnumber);
  };

  const editTicket = (ticketnumber) => {
    console.log("Edit Button on Ticket: ", ticketnumber);
    ticketNumberToEdit(ticketnumber);
  };

  const deleteTicket = (ticketnumber) => {
    console.log("Delete Button on Ticket: ", ticketnumber);
    onDeleteButton(ticketnumber)
  };

  return (
    <>
      <tr className={`TicketRow ${expanded ? "open" : ""}`}>
        <td>{ticket.ticketNumber}</td>
        <td>{formatCreationDate()}</td>
        <td className="ticket-title">{ticket.ticketTitle}</td>
        <td className="non-mobile">{formatLocation()}</td>
        <td className="non-mobile">{ticket.akz}</td>
        <td className="non-mobile">{ticket.createdBy}</td>
        <td>
          <label
            className="TicketStateLabel"
            style={{
              backgroundColor: `rgba(${getStateColor(
                ticket.ticketState
              )}, 0.3)`,
              borderColor: `rgba(${getStateColor(ticket.ticketState)}, 1)`,
            }}
          >
            {ticket.ticketState}
          </label>
        </td>
        <td>
          <Link
            className="EmployeeLink"
            onClick={() => {
              toggleRow(ticket.ticketNumber);
            }}
          >
            <span className="toggleicon material-symbols-outlined">
              expand_more
            </span>
          </Link>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan="8" className="ExpandedRow">
            <div className="TicketExpandedContent">
              <div className="TicketDataContainer">
                <textarea readOnly value={ticket.ticketText} />
              </div>
              <div className="TicketButtonsContainer">
                <button
                  className="TicketButton save"
                  onClick={() => generatePdf(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">
                    picture_as_pdf
                  </span>
                  <span className="TicketButtonText">PDF erstellen</span>
                </button>
                <button
                  className="TicketButton cancel"
                  onClick={() => editTicket(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">edit</span>
                  <span className="TicketButtonText">Bearbeiten</span>
                </button>
                <button
                  className="TicketButton delete"
                  onClick={() => deleteTicket(ticket.ticketNumber)}
                >
                  <span className="material-symbols-outlined">delete</span>
                  <span className="TicketButtonText">Ticket Löschen</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
