import React, { useState } from "react";
import Post from "../../../../Functions/Api/Requests/Post";

export const MonthSelector = ({ onResponse }) => {
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
      const shiftResponse = await Post.GenerateShiftMonth({month: selectedMonth, year: 2024});
      console.log(shiftResponse);
      onResponse(shiftResponse);
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
      <button onClick={handleButtonClick}>Erstellen</button>
    </div>
  );
};
