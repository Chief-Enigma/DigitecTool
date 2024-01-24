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
        const result = await Get.GetAllTickets("all");
        setTickets(result);
      } catch (error) {
        console.error("Error getting tickets:", error);
      }
    };
    getTickets();
  }, []);

  const getTicketText = async (ticketNumber) => {
    await Get.GetTicketText(ticketNumber)
      .then((res) => {
        const updatedTickets = [...tickets];
        const updatedTicketIndex = updatedTickets.findIndex(
          (ticket) => ticket.ticketNumber === res.ticketNumber
        );
        if (updatedTicketIndex !== -1) {
          updatedTickets[updatedTicketIndex] = res;
          setTickets(updatedTickets);
        } else {
          updatedTickets.push(res);
        }
      })
      .catch((e) => {
        console.log("Fehler beim TicketText holen: ", e);
      });
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      sortAndSetTickets(tickets.slice());
      return;
    }

    const filteredTickets = tickets.filter((ticket) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();

      if (
        !isNaN(searchInput) &&
        ticket.ticketNumber.toString().startsWith(searchInput)
      ) {
        return true;
      }
      return ticket.ticketTitle.toLowerCase().startsWith(lowerCaseSearchInput);
    });

    sortAndSetTickets(filteredTickets);
  }, [searchInput, tickets]);

  const sortAndSetTickets = (ticketArray) => {
    const statusOrder = {
      open: 0,
      "to plan": 1,
      planed: 2,
      closed: 3,
    };

    const sortedTickets = ticketArray.sort((a, b) => {
      const dateComparison =
        new Date(b.creationDate) - new Date(a.creationDate);
      if (dateComparison !== 0) {
        return dateComparison;
      }

      const statusA = a.ticketState in statusOrder ? a.ticketState : "Other";
      const statusB = b.ticketState in statusOrder ? b.ticketState : "Other";

      return statusOrder[statusA] - statusOrder[statusB];
    });

    setTicketsSearchResults(sortedTickets);
  };

  const toggleRow = (ticketNumber) => {
    const newExpandedRows = [...expandedRows];
    const index = newExpandedRows.indexOf(ticketNumber);
    if (index !== -1) {
      newExpandedRows.splice(index, 1);
    } else {
      newExpandedRows.push(ticketNumber);
      getTicketText(ticketNumber);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div>
      <table className="EmployeeTable">
        <tbody>
          <tr className="EmployeeRow EmployeeTitleRow">
            <td>Nr.</td>
            <td>Datum</td>
            <td>Titel</td>
            <td>Bereich</td>
            <td>AKZ</td>
            <td>Erstellt von</td>
            <td>Status</td>
            <td></td>
          </tr>
          {ticketsSearchResults.map((ticket) => (
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
