import React, { forwardRef } from "react";



export default function DateColum({ todayheader }) {

  return (
    <th className="DateHeader">
      <a>{todayheader}</a>
    </th>
  );
}
