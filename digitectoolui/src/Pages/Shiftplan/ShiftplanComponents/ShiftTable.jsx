import React, { forwardRef } from "react";
import { ShiftHeader } from "./ShiftHeader";
import { WorkerTable } from "./WorkerTable";

export const ShiftTable = ({ shiftheaders, workerShiftList, date }) => {
  const shiftcolums = [];
  const shiftjobs = ["A", "A-TS", "A-AKL", "A-WE", "B", "SR"];
  const maintenancejobs = ["W", "SH-W", "R+I"];

  //shiftcolums.push(<DayTableFunctions date={date} />)

  shiftheaders.forEach((shiftheader) => {
    const ShiftList = [];

    workerShiftList.forEach((workerShift) => {
      if (shiftheader.shiftID === "W") {
        if (
          workerShift.job === "W" ||
          workerShift.job === "SH-W" ||
          workerShift.job === "R+I"
        ) {
          ShiftList.push(workerShift);
        }
      } else if (shiftheader.shiftID === "A") {
        if (
          workerShift.shift === "A" ||
          workerShift.shift === "F" ||
          workerShift.shift === "K" ||
          workerShift.shift === "KR" ||
          workerShift.shift === "-"
        ) {
          ShiftList.push(workerShift);
        }
      } else if (shiftheader.shiftID !== "W") {
        if (
          shiftheader.shiftID === workerShift.shift &&
          workerShift.job !== "W" &&
          workerShift.job !== "SH-W" &&
          workerShift.job !== "R+I"
        ) {
          ShiftList.push(workerShift);
        }
      }
    });

    if (ShiftList.length) {
      shiftcolums.push(
        <td>
          <table className="ShiftTable">
            <ShiftHeader shiftheader={shiftheader} />
            <WorkerTable workers={ShiftList} />
          </table>
        </td>
      );
    }
  });

  return <table>{shiftcolums}</table>;
};
