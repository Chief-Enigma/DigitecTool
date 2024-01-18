import React, { useState, useEffect } from "react";
import Put from "../../../../Functions/Api/Requests/Put";

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [shiftDays, setShiftDays] = useState([]);

  const JobTypes = [
    "A",
    "A-TS",
    "A-WE",
    "A-AKL",
    "B",
    "SR",
    "SH-W",
    "W",
    "TD",
    "F",
    "K",
    "-",
  ];

  const getShiftColor = (shift) => {
    switch (shift) {
      case "FS":
        return `rgba(222, 31, 67, 0.3)`;
      case "SS":
        return "rgba(153, 198, 142, 0.3)";
      case "TD":
        return "rgba(153, 153, 102, 0.3)";
      default:
        return "";
    }
  };

  const sortedEmployees = employeesTeam.sort((a, b) => {
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      "Junior Maintenance Technician": 2,
    };
    return roleOrder[a.workerRole] - roleOrder[b.workerRole];
  });

  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
  };

  const ShiftDay = (matchingShift, day, employee) => {
    return (
      <td
        key={day.date + employee.personalNumber}
        className="ShiftDayLabel"
        style={{
          backgroundColor: getShiftColor(matchingShift.shift),
        }}
        onClick={() => {
          if (selectedJobType) {
            if (matchingShift) {
              matchingShift.job = selectedJobType;
              SaveDay(matchingShift);
              console.log("Shiftbox", matchingShift);
            }
          }
        }}
      >
        {matchingShift && matchingShift.job !== "" ? matchingShift.job : "-"}
      </td>
    );
  };

  const SaveDay = async (shiftday) => {
    await Put.SaveShiftDay(shiftday)
      .then((res) => {
        console.log("API-Antwort", res);

        if (res.shift && selectedJobType) {
          const updatedShiftDays = shiftDays.map((shift) =>
            shift.personalNumber === shiftday.personalNumber &&
            shift.shiftDate === shiftday.shiftDate
              ? { ...shift, job: selectedJobType, shift: res.shift }
              : shift
          );
          setShiftDays(updatedShiftDays);
        }
        return res.shift;
      })
      .catch((e) => {
        console.log("Fehler beim Speichern der Schicht: ", e);
      });
  };

  const employeeShiftsMap = {};
  shiftMonth.forEach((shift) => {
    if (!employeeShiftsMap[shift.personalNumber]) {
      employeeShiftsMap[shift.personalNumber] = [];
    }
    employeeShiftsMap[shift.personalNumber].push(shift);
  });

  Object.values(employeeShiftsMap).forEach((shifts) => {
    shifts.sort((a, b) => new Date(a.shiftDate) - new Date(b.shiftDate));
  });

  const uniqueDatesSet = new Set(shiftMonth.map((shift) => shift.shiftDate));
  const uniqueDatesArray = Array.from(uniqueDatesSet);

  const daysInMonth = uniqueDatesArray.map((date) => ({
    date: date,
    dayName: new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(
      new Date(date)
    ),
  }));

  return (
    <div className="PlaningContainer">
      <div className="PlanSettings">
        {JobTypes.map((type) => (
          <label
            key={type}
            className={`JobTypeLabel ${
              selectedJobType === type ? "SelectedJobType" : ""
            }`}
            onClick={() => handleJobTypeClick(type)}
          >
            {type}
          </label>
        ))}
      </div>
      <table className="CreateShiftTable" style={{ whiteSpace: "nowrap" }}>
        <tbody>
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
          {sortedEmployees.map((employee) => {
            const employeeShifts =
              employeeShiftsMap[employee.personalNumber] || [];
            return (
              <tr key={employee.personalNumber}>
                <td className="NameLabel">{`${employee.firstName} ${employee.lastName}`}</td>
                {daysInMonth.map((day) => {
                  const matchingShift = employeeShifts.find(
                    (shift) => shift.shiftDate === day.date
                  );
                  return ShiftDay(matchingShift, day, employee);
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
