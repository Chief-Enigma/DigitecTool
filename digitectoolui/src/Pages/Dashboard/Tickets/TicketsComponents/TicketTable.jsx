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
        const result = await Get.GetAllTickets();
        setTickets(result);
        console.log(result);
      } catch (error) {
        console.error("Error getting tickets:", error);
      }
    };
    getTickets();
  }, []);

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
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      "Junior Maintenance Technician": 2,
    };

    const sortedTickets = ticketArray.sort((a, b) => {
      const roleA = a.workerRole in roleOrder ? a.workerRole : "Other";
      const roleB = b.workerRole in roleOrder ? b.workerRole : "Other";

      const roleComparison = roleOrder[roleA] - roleOrder[roleB];
      if (roleComparison !== 0) {
        return roleComparison;
      }

      const personalNumberA = isNaN(a.personalNumber) ? 0 : Number(a.personalNumber);
      const personalNumberB = isNaN(b.personalNumber) ? 0 : Number(b.personalNumber);

      return personalNumberA - personalNumberB;
    });

    setTicketsSearchResults(sortedTickets);
  };

  const toggleRow = (personalNumber) => {
    const newExpandedRows = [...expandedRows];
    const index = newExpandedRows.indexOf(personalNumber);
    if (index !== -1) {
      newExpandedRows.splice(index, 1);
    } else {
      newExpandedRows.push(personalNumber);
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
          {ticketsSearchResults.map((employee) => (
            <TicketRow
              key={employee.personalNumber}
              employee={employee}
              expanded={expandedRows.includes(employee.personalNumber)}
              toggleRow={toggleRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
