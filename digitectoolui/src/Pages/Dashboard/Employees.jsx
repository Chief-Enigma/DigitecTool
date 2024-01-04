import React, { useState } from "react";
import "./Employees/Employees.css";

import { EmployeesTable } from "./Employees/EmployeesTable";
import { EditEmployee } from "./Employees/EditEmployee";

export const Employees = (props) => {
  const [editActiv, setEditActiv] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState("");
  const [newEmployee, setNewEmployee] = useState(false);

  return editActiv ? (
    <EditEmployee setEditActiv={setEditActiv} editEmployeeData={editEmployeeData} newEmployee={newEmployee}/>
  ) : (
    <EmployeesTable setEditActiv={setEditActiv} setEditEmployeeData={setEditEmployeeData} setNewEmployee={setNewEmployee}/>
  );
};
