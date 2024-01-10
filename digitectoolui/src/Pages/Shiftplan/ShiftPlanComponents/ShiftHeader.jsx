import React, { forwardRef } from "react";

export const ShiftHeader = ({ shiftheader }) => {
  return (
    <th
      className="ShiftHeader"
      style={{ backgroundColor: shiftheader.backgroundcolor }}
    >
      <a>{shiftheader.shiftname}</a>
    </th>
  );
};
