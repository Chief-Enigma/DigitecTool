import React, { useState } from "react";
import "./AdminUsersComponents/AdminUserMain.css";

import { UserHeader } from "./AdminUsersComponents/AdminUserHeader";
import { UserTable } from "./AdminUsersComponents/AdminUserTable";

export const AdminUsersMain = () => {
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
