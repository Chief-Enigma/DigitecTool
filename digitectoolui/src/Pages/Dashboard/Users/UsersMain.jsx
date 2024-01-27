import React, { useState } from "react";
import "./UsersComponents/UserMain.css";

import { UserHeader } from "./UsersComponents/UserHeader";
import { UserTable } from "./UsersComponents/UserTable";

export const UsersMain = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearchChange = (value) => {
    setSearchInput(value);
  };
  return (
    <div className="DashboardContendBox">
      <UserHeader onSearchChange={handleSearchChange} />
      <UserTable searchInput={searchInput} />
    </div>
  );
};
