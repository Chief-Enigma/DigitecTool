import React from "react";

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {
  // Sort employees by role: Shift Manager, Maintenance, Juniors
  const sortedEmployees = employeesTeam.sort((a, b) => {
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      Junior: 2,
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

  const daysInMonth = shiftMonth.map((shift) => ({
    date: shift.shiftDate,
    dayName: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(shift.shiftDate)
    ),
  }));

  return (
    <table style={{ whiteSpace: "nowrap", padding: "4px" }}>
      <tbody>
        <tr>
          <td>Name</td>
          {/* Add cells for each day in the selected month */}
          {daysInMonth.map((day) => (
            <td key={day.date}>{`${day.date.slice(8)} ${day.dayName.substring(
              0,
              3
            )}`}</td>
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
                  <td key={day.date + employee.personalNumber}>
                    {matchingShift && matchingShift.shift !== null
                      ? matchingShift.shift
                      : "---"}
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
