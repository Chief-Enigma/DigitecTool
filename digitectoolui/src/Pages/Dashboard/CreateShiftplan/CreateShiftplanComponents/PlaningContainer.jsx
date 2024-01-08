import React, { useState, useEffect } from "react";

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {
  const JobTypes = ["A", "A-TS", "A-WE", "A-AKL", "B", "SR", "SH-W", "W"];
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [shiftDays, setShiftDays] = useState([]);

  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
    console.log(`Selected Job Type: ${jobType}`);
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
    dayName: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(date)
    ),
  }));

  return (
    <div className="PlaningContainer">
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
      <table className="CreateShiftTable" style={{ whiteSpace: "nowrap" }}>
        <tbody>
          <tr>
            <td>
              <label className="NameLabel">Name</label>
            </td>
            {daysInMonth.map((day) => (
              <td key={day.date}>
                <label className="DayLabel">{`${day.date.slice(
                  8
                )} ${day.dayName.substring(0, 3)}`}</label>
              </td>
            ))}
          </tr>
          {sortedEmployees.map((employee) => {
            const employeeShifts =
              employeeShiftsMap[employee.personalNumber] || [];
            return (
              <tr key={employee.personalNumber}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                {daysInMonth.map((day) => {
                  const matchingShift = employeeShifts.find(
                    (shift) => shift.shiftDate === day.date
                  );
                  return (
                    <td
                      key={day.date + employee.personalNumber}
                      style={{
                        padding: "6px 12px",
                        border: `1px solid ${
                          selectedJobType ? "red" : "black"
                        }`,
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        // Check if a job type is selected
                        if (selectedJobType) {
                          // Update the selected job type for the clicked shift
                          if (matchingShift) {
                            matchingShift.shift = selectedJobType;
                            // Update the shift days to trigger a re-render
                            setShiftDays([...shiftDays]);
                          }
                        }
                      }}
                    >
                      {matchingShift && matchingShift.shift !== null
                        ? matchingShift.shift
                        : " --- "}
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
