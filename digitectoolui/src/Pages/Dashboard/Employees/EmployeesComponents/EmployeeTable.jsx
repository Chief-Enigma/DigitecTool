import React, { useState, useEffect } from "react";
import Get from "../../../../Functions/Api/Requests/Get";
import { EmployeeRow } from "./EmployeeRow";

export const EmployeeTable = ({ searchInput }) => {
  const [employees, setEmployees] = useState([]);
  const employeeSearchResults = [];
  const employeeRows = [];

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

  employees.forEach((employee) => {
    employeeRows.push(<EmployeeRow key={employee.personalNumber} employee={employee} />);
  });

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
          {employeeRows}
        </tbody>
      </table>
    </div>
  );
};
