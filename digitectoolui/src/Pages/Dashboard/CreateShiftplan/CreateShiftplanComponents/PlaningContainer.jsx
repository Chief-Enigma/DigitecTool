import React, { useState, useEffect } from "react";
import Put from "../../../../Functions/Api/Requests/Put";

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
    "-",
  ];

  const getShiftColor = (shift) => {
    switch (shift) {
      case "FS":
        return "222, 31, 67";
      case "SS":
        return "153, 198, 142";
      case "TD":
        return "153, 153, 102";
      default:
        return "";
    }
  };

  const [selectedJobType, setSelectedJobType] = useState(null);
  const [shiftDays, setShiftDays] = useState([]);

  const handleJobTypeClick = (jobType) => {
    setSelectedJobType(jobType);
    console.log(`Selected Job Type: ${jobType}`);
  };

  const SaveDay = async (shiftday) => {
    try {
      // Speichere den Schichttag auf dem Server
      const response = await Put.SaveShiftDay(shiftday);
      console.log(response);

      // Überprüfe, ob die Antwort eine aktualisierte ShiftDay-Information enthält
      if (response && response.data) {
        const updatedShift = response.data;

        // Finde den Index des aktualisierten Schichts im lokalen State
        const indexOfUpdatedShift = shiftDays.findIndex(
          (shift) => shift.id === updatedShift.id
        );

        if (indexOfUpdatedShift !== -1) {
          // Aktualisiere den lokalen State mit der aktualisierten Schicht
          const updatedShiftDays = [...shiftDays];
          updatedShiftDays[indexOfUpdatedShift] = updatedShift;
          setShiftDays(updatedShiftDays);

          // Aktualisiere den Jobtyp und die Hintergrundfarbe im lokalen State
          setSelectedJobType(updatedShift.job);
        }
      }
    } catch (error) {
      console.log("Fehler beim Speichern der Schicht: " + error);
    }
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
                      style={{
                        backgroundColor: `rgba(${getShiftColor(
                          matchingShift.shift
                        )}, 0.3)`,
                      }}
                      onClick={() => {
                        // Check if a job type is selected
                        if (selectedJobType) {
                          // Update the selected job type for the clicked shift
                          if (matchingShift) {
                            matchingShift.job = selectedJobType;
                            console.log("here is clicked!!!");
                            console.log(matchingShift);
                            SaveDay(matchingShift);
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
