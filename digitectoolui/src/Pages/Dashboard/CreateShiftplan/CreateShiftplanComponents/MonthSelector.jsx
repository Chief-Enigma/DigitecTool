import React, { useState } from "react";
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
    setSelectedMonth(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const employeeResponse = await Get.GetEmployeeByPersonalNumber(
        personalNumber
      );

      const shiftResponse = await Post.GenerateShiftMonth({
        month: selectedMonth,
        year: 2024,
        team: employeeResponse.team,
      });

      const employeesTeamResponse = await Get.GetAllEmployeesByTeam(
        employeeResponse.team
      );

      onResponse({ shiftResponse }, { employeesTeamResponse });
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };
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
      <button disabled={!selectedMonth} onClick={handleButtonClick}>
        Erstellen
      </button>
    </div>
  );
};
