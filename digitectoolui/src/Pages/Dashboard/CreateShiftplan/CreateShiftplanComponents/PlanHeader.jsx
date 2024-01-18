import React from "react";

export const PlanHeader = ({daysInMonth}) => {
  return (
    <tr className="HeaderRow">
      <td>
        <label>Name</label>
      </td>
      {daysInMonth.map((day) => (
        <td key={day.date} className="DayLabel">
          <label>{`${day.date.slice(8)} ${day.dayName}`}</label>
        </td>
      ))}
    </tr>
  );
};
