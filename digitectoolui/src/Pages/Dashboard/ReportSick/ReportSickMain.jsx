import React from "react";
import { RequestForm } from "./ReportSickComponents/RequestForm/RequestFormMain";
import { ApproveRequestForm } from "./ReportSickComponents/ApproveRequestForm/ApproveRequestForm";

import "../RequestHolliday/RequestHollidaysComponents/RequestMainStyles.css"

export const ReportSickMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <RequestForm />
      {(user.permissions.includes("approverequests") ||
        user.userrole.includes("sysadmin")) && <ApproveRequestForm />}
    </>
  );
};
