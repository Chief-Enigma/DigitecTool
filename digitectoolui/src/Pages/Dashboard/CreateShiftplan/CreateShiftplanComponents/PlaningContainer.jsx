import React from "react";

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {

  const JobTypes = ["A", "A-TS", "A-WE", "A-AKL", "B", "SR", "SH-W", "W"];
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
    <table className="CreateShiftTable" style={{ whiteSpace: "nowrap" }}>
      <tbody>
        <tr>
          <td><label className="NameLabel">Name</label></td>
          {daysInMonth.map((day) => (
            <td key={day.date}><label className="DayLabel">{`${day.date.slice(8)} ${day.dayName.substring(0, 3)}`}</label></td>
          ))}
        </tr>
        {sortedEmployees.map((employee) => {
          const employeeShifts = employeeShiftsMap[employee.personalNumber] || [];
          return (
            <tr key={employee.personalNumber}>
              <td>{`${employee.firstName} ${employee.lastName}`}</td>
              {daysInMonth.map((day) => {
                const matchingShift = employeeShifts.find((shift) => shift.shiftDate === day.date);
                return (
                  <td key={day.date + employee.personalNumber} style={{ padding: '6px 12px', border: '1px solid red', borderRadius: '5px' }}>
                    {matchingShift && matchingShift.shift !== null
                      ? matchingShift.shift
                      : " A-TS "}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
