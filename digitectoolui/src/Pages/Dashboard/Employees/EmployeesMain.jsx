import React, { useState, useEffect } from "react";
import "./EmployeesComponents/EmployeesMain.css";
import Get from "../../../Functions/Api/Requests/Get";

import { EmployeeHeader } from "./EmployeesComponents/EmployeeHeader";
import { EmployeeTable } from "./EmployeesComponents/EmployeeTable";

export const EmployeesMain = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");
  console.log('User:', user.permissions);

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="DashboardContendBox">
      <EmployeeHeader onSearchChange={handleSearchChange} />
      <EmployeeTable searchInput={searchInput} />
    </div>
  );
};
