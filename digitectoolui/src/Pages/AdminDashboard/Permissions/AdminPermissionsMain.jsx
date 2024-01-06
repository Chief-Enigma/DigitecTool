import React, { useState, useEffect } from "react";
import "./AdminPermissionsComponents/AdminPermissionsMain.css";

import { AdminPermissionsHeader } from "./AdminPermissionsComponents/AdminPermissionsHeader";
import { AdminPermissionsUserTable } from "./AdminPermissionsComponents/AdminPermissionsUserTable";

export const AdminPermissionsMain = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (value) => {
    setSearchInput(value);
  };
  return (
    <div className="DashboardContendBox">
      <AdminPermissionsHeader onSearchChange={handleSearchChange} />
      <AdminPermissionsUserTable searchInput={searchInput} />
    </div>
  );
};
