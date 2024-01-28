import React from "react";
import { RequestForm } from "./RequestHollidaysComponents/RequestForm/RequestFormMain";
import { ApproveRequestForm } from "./RequestHollidaysComponents/ApproveRequestForm/ApproveRequestForm";

import "./RequestHollidaysComponents/RequestMainStyles.css"

export const RequestHollidaysMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <RequestForm />
      {(user.permissions.includes("approverequests") ||
        user.userrole.includes("sysadmin")) && <ApproveRequestForm />}
    </>
  );
};
