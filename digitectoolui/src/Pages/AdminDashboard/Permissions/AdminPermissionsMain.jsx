import React, { useState } from "react";
import "./AdminPermissionsComponents/AdminPermissionsMain.css";

import { AdminPermissionsHeader } from "./AdminPermissionsComponents/AdminPermissionsHeader";
import { AdminPermissionsUserTable } from "./AdminPermissionsComponents/AdminPermissionsUserTable";

export const AdminPermissionsMain = ({user}) => {
  const [searchInput, setSearchInput] = useState("");
  console.log(user)
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
