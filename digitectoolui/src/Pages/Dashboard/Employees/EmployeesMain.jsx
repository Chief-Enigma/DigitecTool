import React, { useState } from "react";
import "./EmployeesComponents/EmployeesMain.css";

import { EmployeeHeader } from "./EmployeesComponents/EmployeeHeader";
import { EmployeeTable } from "./EmployeesComponents/EmployeeTable";

export const EmployeesMain = () => {
  const [searchInput, setSearchInput] = useState("");

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
