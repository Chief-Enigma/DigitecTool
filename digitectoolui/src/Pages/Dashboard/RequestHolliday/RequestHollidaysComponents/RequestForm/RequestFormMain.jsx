import React from "react";

export const RequestForm = () => {
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
                />
              </div>
            </div>
            <div className="RequestRow">
              <div className="RequestCol-100">
                <input
                  className="RequestTextInput"
                  type="text"
                  placeholder="Bemerkung..."
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
