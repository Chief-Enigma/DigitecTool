import React from "react";
import { ShiftTable } from "./ShiftTable";
import { DateColum } from "./DateColum";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const ShiftDayTable = ({ Shifts, shiftheaders, date }) => {
  const todayheader = new Date(date).toLocaleDateString("de-DE", options);

  if (new Date(date).toLocaleDateString() === new Date().toLocaleDateString()) {
    return (
      <tbody>
        <div className="ShiftTableMonthDiv">
          <table className="DayTable">
            <DateColum todayheader={"Heute - " + todayheader} />
            <tr>
              <ShiftTable
                workerShiftList={Shifts}
                shiftheaders={shiftheaders}
                date={date}
              />
            </tr>
          </table>
        </div>
      </tbody>
    );
  } else {
    return (
      <tbody>
        <div className="ShiftTableMonthDiv">
          <table className="DayTable">
            <DateColum todayheader={todayheader} />
            <tr>
              <ShiftTable
                workerShiftList={Shifts}
                shiftheaders={shiftheaders}
                date={date}
              />
            </tr>
          </table>
        </div>
      </tbody>
    );
  }
};
