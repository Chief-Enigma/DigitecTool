import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { EmployeeRow } from "./EmployeeRow";

export const EmployeeTable = ({ searchInput }) => {
  const [employees, setEmployees] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const result = await Get.GetAllEmployees();
        setEmployees(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    getEmployees();
  }, []);

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
            <td>Name</td>
            <td>Funktion</td>
            <td>Team</td>
            <td>Personalnummer</td>
            <td></td>
          </tr>
          {employees.map((employee) => (
            <EmployeeRow
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
