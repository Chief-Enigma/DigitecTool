import React, { useEffect, useState } from "react";
import Get from "../../Functions/Api/Requests/Get";
import ShiftDayTable from "./ShiftplanComponents/ShiftDayTable";

import "./ShiftplanComponents/ShiftplanStyle.css"


export const ShiftLayouts = [
  { shiftID: "FS", shiftname: "Frühschicht", backgroundcolor: "#de1f43" },
  { shiftID: "SS", shiftname: "Spätschicht", backgroundcolor: "#99C68E" },
  { shiftID: "NS", shiftname: "Nachtschicht", backgroundcolor: "#46C7C7" },
  { shiftID: "W", shiftname: "Wartung", backgroundcolor: "#1F85DE" },
  { shiftID: "TD", shiftname: "Büro", backgroundcolor: "#999966" },
  { shiftID: "A", shiftname: "Abwesend", backgroundcolor: "#ffffff" },
  // { shiftID: "-", shiftname: "Abwesend", backgroundcolor: "#ffffff" }
];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function generateShiftDayTables(workerShifts) {
  const DayTables = [];

  // Get the current Date for reference
  const [currentDate] = new Date().toISOString().split("T");

  //Get the days remaining to end of month
  const referenceDate = new Date(currentDate);
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth() + 1;
  const currentDay = referenceDate.getDate();
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const daysLeftInMonth = daysInCurrentMonth - currentDay + 1;

  //Construct ShiftDate
  function getShiftDate(year, month, day) {
    return new Date(year, month - 1, day + 1).toISOString().split("T");
  }

  for (
    var ShiftDay = currentDay;
    ShiftDay !== daysInCurrentMonth + 1;
    ShiftDay++
  ) {
    const ShiftDate = getShiftDate(currentYear, currentMonth, ShiftDay)[0];
    const Shifts = [];
    workerShifts.forEach((Shift) => {
      if (Shift.shiftDate === ShiftDate) {
        Shifts.push(Shift);
      }
    });
    console.log("Shifts!" + Shifts);
    DayTables.push(
      <ShiftDayTable
        shiftheaders={ShiftLayouts}
        Shifts={Shifts}
        date={ShiftDate}
      />
    );
  }

  return DayTables;
}

export const ShiftplanMain = () => {
  const [dayTables, setDayTables] = useState([]);
  const [loading, setLoading] = useState(true); // Zustand für den Ladezustand

  const getShifts = async (month) => {
    try {
      const response = await Get.GetShiftPlanForMonth(month);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching shifts:", error);
      return [];
    }
  };

  const generateTables = async () => {
    try {
      const shifts = await getShifts("Januar");
      if (shifts && shifts.length > 0) {
        const tables = generateShiftDayTables(shifts);
        setDayTables(tables);
      } else {
        setDayTables([]);
      }
    } finally {
      setLoading(false); // Setze den Ladezustand auf false, unabhängig vom Ergebnis
    }
  };

  useEffect(() => {
    generateTables();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : dayTables && dayTables.length > 0 ? (
    <table className="ShiftTableMonth">{dayTables}</table>
  ) : (
    <p>Nope, nothing here</p>
  );
};

