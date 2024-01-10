import React, { forwardRef } from "react";

export const DateColum = ({ todayheader }) => {
  return (
    <th className="DateHeader">
      <a>{todayheader}</a>
    </th>
  );
};
