import React, { useState, useEffect } from "react";

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {
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
    "-"
  ];
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [shiftDays, setShiftDays] = useState([]);

  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
    console.log(`Selected Job Type: ${jobType}`);
  };

  const handleSaveTable = () => {
    const updatedShifts = shiftMonth.map((shift) => {
      const matchingShift = shiftDays.find(
        (updatedShift) => updatedShift.shiftDate === shift.shiftDate
      );

      return matchingShift || shift; // Use the updated value if available, otherwise keep the original shift
    });

    console.log("Updated Shifts:", updatedShifts);
  };

  useEffect(() => {
    // Update the shift days whenever the selected job type changes
    setShiftDays([]);
  }, [selectedJobType]);

  // Sort employees by role: Shift Manager, Maintenance, Juniors
  const sortedEmployees = employeesTeam.sort((a, b) => {
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      "Junior Maintenance Technician": 2,
    };
    return roleOrder[a.workerRole] - roleOrder[b.workerRole];
  });

  // Create a mapping of personal numbers to their shifts and sort shifts by date
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
        <button onClick={handleSaveTable}>Speichern</button>
      </div>
      <table className="CreateShiftTable" style={{ whiteSpace: "nowrap" }}>
        <tbody>
          <tr className="HeaderRow">
            <td>
              <label>Name</label>
            </td>
            {daysInMonth.map((day) => (
              <td key={day.date} className="DayLabel">
                <label>{`${day.date.slice(8)} ${day.dayName.substring(
                  0,
                  3
                )}`}</label>
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
                  return (
                    <td
                      key={day.date + employee.personalNumber}
                      className="ShiftDayLabel"
                      onClick={() => {
                        // Check if a job type is selected
                        if (selectedJobType) {
                          // Update the selected job type for the clicked shift
                          if (matchingShift) {
                            matchingShift.job = selectedJobType;
                            // Update the shift days to trigger a re-render
                            setShiftDays([...shiftDays]);
                          }
                        }
                      }}
                    >
                      {matchingShift && matchingShift.job !== ""
                        ? matchingShift.job
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
