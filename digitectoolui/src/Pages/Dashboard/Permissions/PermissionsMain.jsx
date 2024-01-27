import React, { useState } from "react";
import "./PermissionsComponents/PermissionsMain.css";

import { PermissionsHeader } from "./PermissionsComponents/PermissionsHeader";
import { PermissionsUserTable } from "./PermissionsComponents/PermissionsUserTable";

export const PermissionsMain = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="DashboardContendBox">
      <PermissionsHeader onSearchChange={handleSearchChange} />
      <PermissionsUserTable searchInput={searchInput} />
    </div>
  );
};
