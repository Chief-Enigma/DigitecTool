import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { EmployeeRow } from "./EmployeeRow";

export const EmployeeTable = ({ searchInput }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeSearchResults, setEmployeeSearchResults] = useState([]);
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

  const sortAndSetEmployees = (employeeArray) => {
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      "Junior Maintenance Technician": 2,
    };

    const sortedEmployees = employeeArray.sort((a, b) => {
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

    setEmployeeSearchResults(sortedEmployees);
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
            <td>Name</td>
            <td>Funktion</td>
            <td>Team</td>
            <td>Personalnummer</td>
            <td></td>
          </tr>
          {employeeSearchResults.map((employee) => (
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
