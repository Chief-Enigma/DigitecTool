import React, { useState, useEffect } from "react";
import Get from "../../../Functions/Api/Requests/Get";

const getEmployees = async () => {
  try {
    const result = await Get.GetAllEmployees();
    console.log(result);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

export const EmployeesMain = () => {
  useEffect(() => {
    getEmployees();
  }, []);

  return <h1>This is EmployeesMain</h1>;
};
