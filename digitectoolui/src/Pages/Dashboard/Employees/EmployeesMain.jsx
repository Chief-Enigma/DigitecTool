import React, { useState, useEffect } from "react";
import "./EmployeesComponents/EmployeesMain.css";
import Get from "../../../Functions/Api/Requests/Get";

import { EmployeeHeader } from "./EmployeesComponents/EmployeeHeader";
import { EmployeeTable } from "./EmployeesComponents/EmployeeTable";

const getEmployees = async () => {
  try {
    const result = await Get.GetAllEmployees();
    console.log(result);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

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
