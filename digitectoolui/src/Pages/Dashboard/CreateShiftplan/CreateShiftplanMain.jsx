import React, { useState } from "react";
import { MonthSelector } from "./CreateShiftplanComponents/MonthSelector";
import { PlaningContainer } from "./CreateShiftplanComponents/PlaningContainer";

import "./CreateShiftplanComponents/CreateShiftplanMain.css";

export const CreateShiftplanMain = ({ user }) => {
  const [shiftMonth, setShiftMonth] = useState([]);
  const [employeesTeam, setEmployeesTeam] = useState([]);

  const handleShiftResponse = (
    { shiftResponse },
    { employeesTeamResponse }
  ) => {
    setShiftMonth(shiftResponse);
    setEmployeesTeam(employeesTeamResponse);

    console.log("ShiftResponse: ");
    console.log(shiftResponse);

    console.log("EmployeesTeam: ");
    console.log(employeesTeamResponse);
  };

  return (
    <div className="DashboardContendBox">
      <div>
        <h2>Schichtplan bearbeiten</h2>
        <MonthSelector
          onResponse={handleShiftResponse}
          personalNumber={user.personalnumber}
        />
      </div>
      <PlaningContainer shiftMonth={shiftMonth} employeesTeam={employeesTeam} />
    </div>
  );
};
