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
        const result = await Get.GetAllEmployees(); //Change to Tickets
        setEmployees(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getTickets();
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      sortAndSetEmployees(employees.slice());
      return;
    }

    const filteredEmployees = employees.filter((employee) => {
      const lowerCaseSearchInput = searchInput.toLowerCase();

      if (
        !isNaN(searchInput) &&
        employee.personalNumber.toString().startsWith(searchInput)
      ) {
        return true;
      }
      return employee.firstName.toLowerCase().startsWith(lowerCaseSearchInput);
    });

    sortAndSetEmployees(filteredEmployees);
  }, [searchInput, employees]);

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
          {employeeSearchResults.map((employee) => (
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
