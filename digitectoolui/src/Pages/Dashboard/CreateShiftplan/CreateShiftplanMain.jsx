import React, { useState } from "react";
import { MonthSelector } from "./CreateShiftplanComponents/MonthSelector";

const ShiftTable = ({ shiftMonth }) => {
  return (
    <table className="ShiftTable">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Schicht</th>
          <th>Job</th>
          <th>Notiz</th>
        </tr>
      </thead>
      <tbody>
        {shiftMonth.map((shift) => (
          <tr key={shift.Id}>
            <td>{shift.shiftDate}</td>
            <td>{shift.personalNumber}</td>
            <td>{shift.Job}</td>
            <td>{shift.Note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export const CreateShiftplanMain = () => {
  const [shiftMonth, setShiftMonth] = useState([]);

  const handleShiftResponse = (value) => {
    setShiftMonth(value);
    console.log(value);
  };

  return (
    <div className="DashboardContendBox">
      <h2>Schichtplan erstellen</h2>
      <MonthSelector onResponse={handleShiftResponse} />
      <ShiftTable shiftMonth={shiftMonth} />
    </div>
  );
};
