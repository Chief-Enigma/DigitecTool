import React, { useState, useEffect } from "react";
import { format } from "date-fns";

export const RequestForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const requestLayOut = {
    id: {},
    requestNumber: 0,
    requestType: "RequestHoliDay",
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

    // Setze dateTo auf das gleiche Datum wie dateFrom, wenn dateFrom geändert wird
    if (name === "dateFrom") {
      setRequest((prevData) => ({
        ...prevData,
        dateFrom: value,
        dateTo: value, // Setze dateTo auf das gleiche Datum wie dateFrom
      }));
    } else {
      // Wenn ein anderes Feld als dateFrom geändert wird, aktualisiere nur dieses Feld
      setRequest((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    console.log(request);
  }, [request]);

  return (
    <div className="DashboardContendBox">
      <div className="RequestForm">
        <div className="RequestHeader">
          <h2>Abwesenheit beantragen</h2>
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
                  id="RequestHollydayFrom"
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
                  id="RequestHollydayTo"
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
                <span className="material-symbols-outlined">send</span>
                <span className="RequestButtonText">Beantragen</span>
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
