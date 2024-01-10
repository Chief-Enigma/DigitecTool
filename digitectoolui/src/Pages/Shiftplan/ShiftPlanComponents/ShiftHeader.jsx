import React, { forwardRef } from "react";

export default function ShiftHeader({ shiftheader }) {
  return (
    <th
      className="ShiftHeader"
      style={{ backgroundColor: shiftheader.backgroundcolor }}
    >
      <a>{shiftheader.shiftname}</a>
    </th>
  );
}
