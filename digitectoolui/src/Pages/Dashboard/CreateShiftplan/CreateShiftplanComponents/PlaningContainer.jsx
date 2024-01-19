import React, { useState } from "react";
import Put from "../../../../Functions/Api/Requests/Put";
//import { GetShiftStyles } from "./GetShiftStyles";

import { PlanSettings } from "./PlanSettings";
import { PlanHeader } from "./PlanHeader";

const GetShiftStyles = ({ shiftDay }) => {
  const getShiftColor = (shift) => {
    switch (shift) {
      case "FS":
        return {
          backgroundColor: "rgba(222, 31, 67, 0.15)",
          borderColor: "rgba(222, 31, 67, 0.6)",
        };
      case "SS":
        return {
          backgroundColor: "rgba(153, 198, 142, 0.15)",
          borderColor: "rgba(153, 198, 142, 0.6)",
        };
      case "TD":
        return {
          backgroundColor: "rgba(153, 153, 102, 0.15)",
          borderColor: "rgba(153, 153, 102, 0.6)",
        };
      case "K":
        return {
          backgroundColor: "rgba(153, 153, 102, 0.15)",
          borderColor: "rgba(153, 153, 102, 0.6)",
        };
      case "F":
        return {
          backgroundColor: "rgba(153, 153, 102, 0.15)",
          borderColor: "rgba(153, 153, 102, 0.6)",
        };
      case "KR":
        return {
          backgroundColor: "rgba(255, 71, 93, 0.15)",
          borderColor: "rgba(255, 71, 93, 0.6)",
        };
      default:
        return "";
    }
  };

  const getJobColor = (job) => {
    switch (job) {
      case "A":
      case "A-AKL":
      case "A-TS":
      case "A-WE":
        return "#eb1c1c";
      case "B":
        return "#29e348";
      case "SR":
        return "#29e348";
      case "W":
      case "SH-W":
        return "#1c7bff";
      case "TD":
        return "#1c7bff";
      case "F":
        return "#1c7bff";
      case "K":
        return "#1c7bff";
      case "KR":
        return "#ed2d44";
      default:
        return "";
    }
  };

  return {
    backgroundColor: getShiftColor(shiftDay.shift).backgroundColor,
    borderColor: getShiftColor(shiftDay.shift).borderColor,
    color: getJobColor(shiftDay.job),
  };
};

export const PlaningContainer = ({ shiftMonth, employeesTeam }) => {
  const [selectedJobType, setSelectedJobType] = useState(null);
  const [employeeShiftsMap, setEmployeeShiftsMap] = useState({});

  // If JobType is Selected => Set it to const
  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
  };

  // Saving the updated Shift to DB
  const SaveShiftday = async (shiftDay, job) => {
    const sendingShift = shiftDay;
    sendingShift.job = job;
    await Put.SaveShiftDay(sendingShift)
      .then((res) => {
        console.log("API-Antwort", res);
        // Aktualisiere das Shift-Objekt im State
        const updatedShiftsMap = { ...employeeShiftsMap };
        const shifts = updatedShiftsMap[shiftDay.personalNumber] || [];
        const updatedShiftIndex = shifts.findIndex(
          (shift) => shift.shiftDate === shiftDay.shiftDate
        );
        if (updatedShiftIndex !== -1) {
          shifts[updatedShiftIndex] = res; // Annahme: Die API-Antwort enthält das aktualisierte Shift-Objekt
          updatedShiftsMap[shiftDay.personalNumber] = shifts;
          setEmployeeShiftsMap(updatedShiftsMap);
        }
      })
      .catch((e) => {
        console.log("Fehler beim Speichern der Schicht: ", e);
      });
  };

  // Sort Employees after Function
  const sortedEmployees = employeesTeam.sort((a, b) => {
    const roleOrder = {
      "Shift Manager": 0,
      "Maintenance Technician": 1,
      "Junior Maintenance Technician": 2,
    };
    return roleOrder[a.workerRole] - roleOrder[b.workerRole];
  });

  // Create a 3D Array with all Shifts for each Employee
  shiftMonth.forEach((shift) => {
    if (!employeeShiftsMap[shift.personalNumber]) {
      employeeShiftsMap[shift.personalNumber] = [];
    }
    employeeShiftsMap[shift.personalNumber].push(shift);
  });

  // Sort Shifts after Date
  Object.values(employeeShiftsMap).forEach((shifts) => {
    shifts.sort((a, b) => new Date(a.shiftDate) - new Date(b.shiftDate));
  });

  // Create Array with all Days of the Month "1 Mo"
  const daysInMonth = Array.from(
    new Set(shiftMonth.map((shift) => shift.shiftDate))
  ).map((date) => ({
    date: date,
    dayName: new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(
      new Date(date)
    ),
  }));

  return (
    <div>
      <PlanSettings onSelectJobType={handleJobTypeClick} />
      <table className="CreateShiftTable" style={{ whiteSpace: "nowrap" }}>
        <tbody>
          <PlanHeader daysInMonth={daysInMonth} />
          {sortedEmployees.map((employee) => {
            const employeeShifts =
              employeeShiftsMap[employee.personalNumber] || [];
            return (
              <tr key={employee.personalNumber}>
                <td
                  className="NameLabel"
                  key={employee.personalNumber + employee.firstName}
                >{`${employee.firstName} ${employee.lastName}`}</td>
                {daysInMonth.map((day) => {
                  const shiftDay = employeeShifts.find(
                    (shift) => shift.shiftDate === day.date
                  );
                  return (
                    <td
                      key={day.date + employee.personalNumber}
                      className="ShiftDayLabel"
                      style={GetShiftStyles({ shiftDay })}
                      onClick={() => {
                        if (selectedJobType) {
                          if (shiftDay) {
                            SaveShiftday(shiftDay, selectedJobType);
                          }
                        }
                      }}
                    >
                      {shiftDay && shiftDay.job !== "" ? shiftDay.job : "-"}
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
