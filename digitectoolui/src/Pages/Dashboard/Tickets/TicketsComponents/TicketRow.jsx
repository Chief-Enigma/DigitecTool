import React from "react";
import { Link } from "react-router-dom";

export const TicketRow = ({ ticket, expanded, toggleRow }) => {
  //const ticketStates = ["open", "to plan", "planed", "closed"];

  const formatCreationDate = () => {
    const creationDate = new Date(ticket.creationDate);
    const formattedDate = creationDate.toLocaleDateString();
    return formattedDate;
  };

  const formatLocation = () => {
    const locationString = ticket.location.map((location) => (
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

  return (
    <>
      <tr className={`EmployeeRow ${expanded ? "open" : ""}`}>
        <td>{ticket.ticketNumber}</td>
        <td>{formatCreationDate()}</td>
        <td>{ticket.ticketTitle}</td>
        <td>{formatLocation()}</td>
        <td>{ticket.akz}</td>
        <td>{ticket.createdBy}</td>
        <td>
          <label
            className="RoleLabel"
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
        <tr className="ExpandedRow">
          <td colSpan="7">
            <div className={`TicketDataContainer ${expanded ? "open" : ""}`}>
              <textarea readOnly value={ticket.ticketText} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
