import React from "react";
import { useParams } from "react-router-dom";

export const EditEmployee = () => {
  const { personalnumber } = useParams();

  console.log(useParams());
  console.log("via var: " + personalnumber);

  return (
    <div className="DashboardContendBox">
      <h1>Edit Employee Page</h1>
    </div>
  );
};
