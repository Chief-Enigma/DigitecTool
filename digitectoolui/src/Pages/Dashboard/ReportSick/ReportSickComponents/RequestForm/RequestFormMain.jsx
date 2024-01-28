import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export const RequestForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const requestLayOut = {
    id: {},
    requestNumber: 0,
    requestType: "ReportSick",
    requestState: "open",
    creationDate: format(new Date(), "yyyy-MM-dd"),
    requestFrom: user.personalnumber,
    dateFrom: format(Date(), "yyyy-MM-dd"),
    dateTo: format(Date(), "yyyy-MM-dd"),
    note: "",
  };
  const [request, setRequest] = useState(requestLayOut);

  //* Handle TextEdit Actions *//
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const selectedDate = new Date(value);
    const today = new Date();

    if (name === "dateFrom" || name === "dateTo") {
      if (selectedDate < today) {
        setRequest((prevData) => ({
          ...prevData,
          [name]: format(today, "yyyy-MM-dd"),
        }));
      } else {
        setRequest((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setRequest((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="DashboardContendBox">
      <div className="RequestForm">
        <div className="RequestHeader">
          <h2>Krankmelden</h2>
          <button
            className="RequestButton help"
            onClick={() => console.log("HelpButton pressed")}
          >
            <span className="material-symbols-outlined">lightbulb</span>
          </button>
        </div>
        <div className="RequestRow">
          <div className="RequestCol-100">
            <div className="RequestRow">
              <div className="RequestCol-40">
                <label className="RequestLabel" htmlFor="RequestHollydayFrom">
                  Von
                </label>
                <input
                  className="RequestDateInput"
                  type="date"
                  id="ReportSickFrom"
                  name="dateFrom"
                  value={request.dateFrom}
                  onChange={handleInputChange}
                />
              </div>
              <div className="RequestCol-20">
                <span className="RequestIcon material-symbols-outlined">
                  arrow_back
                </span>
              </div>
              <div className="RequestCol-40">
                <label className="RequestLabel" htmlFor="RequestHollydayTo">
                  Bis
                </label>
                <input
                  className="RequestDateInput"
                  type="date"
                  id="ReportSickTo"
                  name="dateTo"
                  value={request.dateTo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="RequestRow">
              <div className="RequestCol-100">
                <input
                  className="RequestTextInput"
                  type="text"
                  placeholder="Bemerkung..."
                  name="note"
                  value={request.note}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="RequestRow RequestButtonContainer">
              <button
                className="RequestButton send"
                onClick={() => console.log("Save Button pressed")}
              >
                <span className="material-symbols-outlined">sick</span>
                <span className="RequestButtonText">Melden</span>
              </button>
              <button
                className="RequestButton cancel"
                onClick={() => console.log("Cancel Button pressed")}
              >
                <span className="material-symbols-outlined">close</span>
                <span className="RequestButtonText">Abbrechen</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
