import React, { useState, useEffect } from "react";
import Post from "../../../../Functions/Api/Requests/Post";
import Get from "../../../../Functions/Api/Requests/Get";

export const MonthSelector = ({ onResponse, personalNumber }) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const handleMonthChange = (event) => {
    const newSelectedMonth = event.target.value;
    setSelectedMonth(newSelectedMonth);
  };

  const GetPlan = async (month) => {
    try {
      const employeeResponse = await Get.GetEmployeeByPersonalNumber(
        personalNumber
      );

      const employeesTeamResponse = await Get.GetAllEmployeesByTeam(
        employeeResponse.team
      );

      const shiftResponse = await Post.GetShiftMonth({
        month: month,
        year: 2024,
        team: employeeResponse.team,
      });

      onResponse({ shiftResponse }, { employeesTeamResponse });
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      GetPlan(selectedMonth);
    }
  }, [selectedMonth]); // Höre auf Änderungen von selectedMonth

  return (
    <div className="MonthSelectorContainer">
      <label>Monat wählen:</label>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="" disabled>
          Select a month
        </option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};
